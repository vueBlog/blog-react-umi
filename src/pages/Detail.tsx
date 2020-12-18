import React from 'react';

export default (props: any): React.ReactNode => (
  <>
    <div>{JSON.stringify(props.match.params.id)}</div>
  </>
);
