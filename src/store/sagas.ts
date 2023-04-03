import watchFetchProducts from "./products/sagas";

function* watchAll() {
  yield watchFetchProducts();
}

export default watchAll;
