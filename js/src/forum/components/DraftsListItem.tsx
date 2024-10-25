import app from 'flarum/forum/app';
import Component from 'flarum/common/Component';
import Avatar from 'flarum/common/components/Avatar';
import Icon from 'flarum/common/components/Icon';
import ItemList from 'flarum/common/utils/ItemList';
import { truncate } from 'flarum/common/utils/string';
import Button from 'flarum/common/components/Button';
import Tooltip from 'flarum/common/components/Tooltip';
import HeaderListItem from 'flarum/forum/components/HeaderListItem';

import type Mithril from 'mithril';
import Draft from '../models/Draft';
import DraftsListState from '../states/DraftsListState';

export interface IAttrs {
  draft: Draft;
  state: DraftsListState;
}

export default class DraftsListItem extends Component<IAttrs> {
  private canSchedule: boolean = app.forum.attribute<boolean>('canScheduleDrafts') && app.forum.attribute<boolean>('drafts.enableScheduledDrafts');

  oncreate(vnode: Mithril.Vnode) {
    super.oncreate(vnode);
  }

  view() {
    const { draft, state } = this.attrs;

    return (
      <HeaderListItem
        className={'Draft'}
        avatar={<Avatar user={draft.user() || null} />}
        icon={draft.icon()}
        content={
          <>
            {draft.scheduledFor() && (
              <Tooltip
                showOnFocus={false}
                text={app.translator.trans('fof-drafts.forum.dropdown.scheduled_icon_tooltip', {
                  datetime: dayjs(draft.scheduledFor()).format(app.translator.trans('fof-drafts.forum.dropdown.scheduled_icon_tooltip_formatter')[0]),
                })}
              >
                <Icon name="far fa-clock" className="draft--scheduledIcon" />
              </Tooltip>
            )}
            {draft.type() === 'reply' ? draft.loadRelationships().discussion.title() : draft.title()}
          </>
        }
        excerpt={[
          truncate(draft.content(), 200),
          draft.scheduledValidationError() ? <p className="scheduledValidationError">{draft.scheduledValidationError()}</p> : '',
        ]}
        datetime={draft.updatedAt()}
        onclick={state.showComposer.bind(state, draft)}
        actions={this.actionItems().toArray()}
      />
    );
  }

  actionItems() {
    const items = new ItemList();
    const { draft, state } = this.attrs;

    items.add(
      'delete',
      <Tooltip showOnFocus={false} text={app.translator.trans('fof-drafts.forum.dropdown.delete_button')}>
        <Button
          data-container="body"
          icon="fas fa-trash-alt"
          className="HeaderListItem-action Button Button--link hasIcon draft--delete"
          onclick={(e: MouseEvent) => {
            state.deleteDraft(draft);
            e.stopPropagation();
          }}
        />
      </Tooltip>
    );

    if (this.canSchedule) {
      let scheduledDraftIcon = 'far fa-calendar-plus';
      if (draft.scheduledValidationError()) scheduledDraftIcon = 'far fa-calendar-times';
      else if (draft.scheduledFor()) scheduledDraftIcon = 'far fa-calendar-check';

      items.add(
        'schedule',
        <Tooltip showOnFocus={false} text={app.translator.trans('fof-drafts.forum.dropdown.schedule_button')}>
          <Button
            data-container="body"
            icon={scheduledDraftIcon}
            className="HeaderListItem-action Button Button--link hasIcon draft--schedule"
            onclick={(e: MouseEvent) => {
              state.scheduleDraft(draft);
              e.stopPropagation();
            }}
          />
        </Tooltip>
      );
    }

    return items;
  }
}
