interface PayloadThemes {
  name: string;
}

export const mutateThemes = async (params: PayloadThemes) => {
  const fetchUrl = `/api/admin/themes`;

  const themes = await fetch(fetchUrl, {
    body: JSON.stringify(params),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return themes;
};
