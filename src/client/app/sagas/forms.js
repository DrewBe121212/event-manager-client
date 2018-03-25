import {select, take, put} from 'redux-saga/effects';
import {
  SAVE_FORM
} from 'constants/forms';
import {saveFormSuccessful, saveFormFailure} from 'actions/forms';

export function* watchSaveForm() {
  const actions = {
    success: ['_SUCCESSFUL'],
    failure: ['_FAILURE']
  };

  while(true) {
    const saveForm = yield take(SAVE_FORM);
    const nextAction = yield take('*');
    const nextActionType = nextAction.type;
    const nextActionResult = yield take('*');
    const nextActionResultType = nextActionResult.type;
    const nextActionResultActionStatus = nextActionResultType.substr(nextActionResultType.lastIndexOf('_'));
    
    // sanity check
    if (nextActionType.concat(nextActionResultActionStatus) === nextActionResultType) {
      if (actions.success.indexOf(nextActionResultActionStatus) >= 0) {
        yield put(saveFormSuccessful(nextActionResult.payload));
      } else if (actions.failure.indexOf(nextActionResultActionStatus) >= 0) {
        yield put(saveFormFailure(nextActionResult.payload));
      }
    }
  }
}