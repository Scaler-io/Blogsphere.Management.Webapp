import { SIDENAV_STATE_TOGGLE, SidenavActions } from './sidenav.action';

export const SIDENAV_TOGGLE_STATE_NAME = 'sidenavToggle';

export interface SidenavToggleState {
  expanded: boolean;
}

const initialState: SidenavToggleState = {
  expanded: true,
};

export function sidenavToggleReducer(
  state: SidenavToggleState = initialState,
  action: SidenavActions
) {
  switch (action.type) {
    case SIDENAV_STATE_TOGGLE:
      return {
        ...state,
        expanded: !state.expanded,
      };
    default:
      return state;
  }
}
