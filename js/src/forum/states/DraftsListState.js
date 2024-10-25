import app from 'flarum/forum/app';
import ScheduleDraftModal from '../components/ScheduleDraftModal';

export default class DraftsListState {
  constructor() {
    /**
     * Whether or not the flags are loading.
     *
     * @type {Boolean}
     */
    this.loading = false;

    this.cache = [];
  }

  deleteDraft(draft) {
    if (!window.confirm(app.translator.trans('fof-drafts.forum.dropdown.alert'))) return;

    this.loading = true;

    draft.delete().then(() => {
      if (app.composer.body && app.composer.draft && app.composer.draft.id() === draft.id() && !app.composer.changed()) {
        app.composer.hide();
      }

      this.loading = false;
      m.redraw();
    });
  }

  scheduleDraft(draft) {
    if (!app.forum.attribute('canScheduleDrafts') || !app.forum.attribute('drafts.enableScheduledDrafts')) return;

    app.modal.show(ScheduleDraftModal, { draft });
  }

  showComposer(draft) {
    if (this.loading) return;

    let componentLoader;

    switch (draft.type()) {
      case 'privateDiscussion':
        componentLoader = () => import('flarum/forum/components/DiscussionComposer').then(async () => {
          return await import('ext:fof/byobu/forum/pages/discussions/PrivateDiscussionComposer');
        });
        break;
      case 'reply':
        componentLoader = () => import('flarum/forum/components/ReplyComposer');
        break;
      default:
        componentLoader = () => import('flarum/forum/components/DiscussionComposer');
    }

    return new Promise((resolve) => {
      const data = draft.compileData();

      app.composer.load(componentLoader, data).then(() => {
        app.composer.show();
        Object.assign(app.composer.fields, data.fields);
      });

      return resolve(app.composer);
    });
  }

  load() {
    if (app.cache.draftsLoaded) {
      return;
    }

    this.loading = true;
    m.redraw();

    app.store
      .find('drafts')
      .then(
        () => (app.cache.draftsLoaded = true),
        () => {}
      )
      .then(() => {
        this.loading = false;
        m.redraw();
      });
  }
}
