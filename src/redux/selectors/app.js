export const getAllApps = (state) => {
  const { allAppIds, byAppIds } = state;

  return allAppIds.map(appId => {
    return {
      appId,
      ...byAppIds[appId].content
    }
  });
}
