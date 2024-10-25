/*
 *
 *  This file is part of fof/drafts.
 *
 *  Copyright (c) 2019 FriendsOfFlarum.
 *
 *  For the full copyright and license information, please view the LICENSE.md
 *  file that was distributed with this source code.
 *
 */

import app from 'flarum/admin/app';
import { extend } from 'flarum/common/extend';

export { default as extend } from './extend';

app.initializers.add('fof-drafts', () => {
  extend(app, 'getRequiredPermissions', function (required, permission) {
    if (permission === 'user.scheduleDrafts') {
      required.push('user.saveDrafts');
    }
  });
});
