import { SagaIterator } from "redux-saga";
import { spawn, call, all } from "redux-saga/effects";
import { appSaga } from "redux/app/sagas";

const sagas = [appSaga]; // This approach allows running several independent sagas.
export default function* root(): SagaIterator {
  yield all(
    sagas.map((saga) =>
      spawn(function* () {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (e) {
            console.error(e);
          }
        }
      })
    )
  );
}
