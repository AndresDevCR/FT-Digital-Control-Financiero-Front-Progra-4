import React from 'react';
import RoleBasedGuard from '../../../../auth/RoleBasedGuard';

export default function edit() {
  return (
    <RoleBasedGuard roles={['administrator', 'admin', 'user']} hasContent>
      <div>edit</div>
    </RoleBasedGuard>
  );
}
