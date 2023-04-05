import { useState, useEffect } from "react";

import { uniqBy } from "lodash";
import useTranslation from "./translations";
import { api } from "../api";

const ASCENDING = 1;
const DESCENDING = 1;
const DEFAULT_API_SIZE = 50;
const SEARCH = "search";
const NAME = "name";
const DEFAULT_STATE_LIST = {
  results: [],
  count: 0,
  next: "",
  previous: "",
  errors: {},
  loading: false,
  search: "",
  page: 1,
  pages: [],
  selected: [],
  filters: [],
  selectAll: false,
  sortingOrder: {
    appliedSort: null,
    status: ASCENDING,
    defaultSort: NAME,
  },
  useNext: false, // if you want list to use 'next' paramater returned from API
};

const DEFAULT_CRUD = {
  create: async () => {},
  read: async () => {},
  update: async () => {},
  delete: async () => {},
};

const useListState = (defaultState, CRUD = DEFAULT_CRUD) => {
  const [listState, setListState] = useState(
    defaultState || DEFAULT_STATE_LIST
  );
  const { t } = useTranslation();

  const isSelectAllChecked = (results, selected) =>
    results.filter((res) => selected.some(({ id }) => id == res.id)).length ===
    results.length;

  const fetchListState = async (
    page = listState.page,
    page_size = DEFAULT_API_SIZE
  ) => {
    setListState((prevState) => ({ ...prevState, loading: true }));
    try {
      const { next, useNext, filters, sortingOrder } = listState;
      const { appliedSort, status } = sortingOrder;

      const serverFilters = filters.reduce((params, { type, value }) => {
        const existing = params[type] ? `${params[type]},` : "";
        return { ...params, [type]: `${existing}${value}` };
      }, {});

      const serverSort = !!appliedSort
        ? {
            ordering: status === DESCENDING ? `-${appliedSort}` : appliedSort,
          }
        : {};

      const { data } =
        useNext && next
          ? await api(next)
          : await CRUD.read({
              page_size,
              page,
              ...serverFilters,
              ...serverSort,
            });
      if (data) {
        const { count, results, next } = data;
        const numberOfPages = Math.ceil(count / page_size);

        setListState((prevState) => ({
          ...prevState,
          page,
          count,
          results,
          next,
          selectAll: isSelectAllChecked(results, prevState.selected),
          selected: prevState.selected.map((sel) => {
            // if in results, update selected to new data
            const indexInResults = results.findIndex(({ id }) => sel.id === id);
            if (indexInResults > -1) return { ...results[indexInResults] };
            return { ...sel };
          }),
          pages: [...Array(numberOfPages + 1).keys()].slice(1),
          errors: {},
        }));
      }
    } catch (err) {
      console.error(err);
      setListStateErrors(err?.response?.data);
    } finally {
      setListState((prevState) => ({ ...prevState, loading: false }));
    }
  };

  const setSelectAll = () => {
    const { selectAll, selected, results } = listState;
    if (selectAll) {
      setListState((prevState) => ({
        ...prevState,
        selectAll: !selectAll,
        selected: selected.filter(
          (item) => !results.some(({ id }) => item.id === id)
        ),
      }));
    } else {
      setListState((prevState) => ({
        ...prevState,
        selected: uniqBy([...results, ...selected], "id"),
        selectAll: !selectAll,
      }));
    }
  };

  // { first_name: "Must include capitals"}
  // populates the error property of corresponding list key
  // too: update for new error handling resp
  const setListStateErrors = (errors) => {
    const newListState = { ...listState };
    for (const key in errors) {
      newListState.errors[key] = errors[key];
    }
    setListState(newListState);
  };

  // removes a filter by its id
  const handleRemoveFilter = (id) =>
    setListState((prevState) => ({
      ...prevState,
      page: 1,
      next: "",
      filters: [...prevState.filters.filter((f) => f.id !== id)],
      search: id === SEARCH ? "" : prevState.search,
    }));

  // adds a filter, overwrites existing ids
  const handleAddFilter = (id, type, name, value) =>
    setListState((prevState) => ({
      ...prevState,
      page: 1,
      next: "",
      filters: [
        ...prevState.filters.filter((f) => f.id !== id),
        { id, type, name, value },
      ],
    }));

  // called on search box submission, adds a search filter
  const handleSearch = () => {
    const { search } = listState;
    if (search.length > 0) {
      handleAddFilter(SEARCH, SEARCH, `Search: ${search}`, search);
    } else {
      handleRemoveFilter(SEARCH, SEARCH);
    }
  };

  // renders the page count string to be displayed in list footer
  const generateFooterCountText = (name) => {
    const pageSize = DEFAULT_API_SIZE;
    const { count, page } = listState;
    const from = count === 0 ? 0 : pageSize * page - pageSize + 1;
    const to = pageSize * page > count ? count : pageSize * page;

    return count > 0
      ? t("global/list/list-footer-text", { from, to, count, name })
      : t("global/list/list-footer-text--empty", { name });
  };

  const handleUpdate = async (id, data) => {
    setListState((prevState) => ({ ...prevState, loading: true }));
    try {
      await CRUD.update(id, data);
      await fetchListState();
    } catch (err) {
      console.error(err);
      setListStateErrors(formatProblemJSONErrors(err?.response?.data));
    }
    setListState((prevState) => ({ ...prevState, loading: false }));
  };

  const handleSelect = (id) => {
    const { selected, results } = listState;
    const isSelected = selected.some((s) => s.id === id);
    const row = results.find((res) => res.id === id);

    setListState((prevState) => ({
      ...prevState,
      selected: isSelected
        ? prevState.selected.filter((s) => s.id !== id)
        : uniqBy([row, ...prevState.selected], "id"),
      selectAll: isSelectAllChecked(
        prevState.results,
        isSelected
          ? prevState.selected.filter((s) => s.id !== id)
          : [...prevState.selected, row]
      ),
    }));
  };

  useEffect(
    () => fetchListState(),
    [listState?.filters, listState?.sortingOrder]
  );

  return {
    listState,
    setListState,
    setListStateErrors,
    fetchListState,
    handleRemoveFilter,
    handleAddFilter,
    handleSearch,
    isSelectAllChecked,
    setSelectAll,
    generateFooterCountText,
    handleUpdate,
    handleSelect,
  };
};

export default useListState;
