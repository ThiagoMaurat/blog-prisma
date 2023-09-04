interface PayloadThemes {
  name: string;
}

export const mutateThemes = async (params: PayloadThemes) => {
  const mutate = await fetch(`api/admin/themes`, {
    body: JSON.stringify(params),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return mutate;
};
