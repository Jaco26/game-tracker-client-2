import CITY_GRAPH from '@/store/static-data/city-graph';

function initialState() {
  return {
    graph: CITY_GRAPH,
  }
}

export default {
  state: initialState(),
}