// Funções de usuários 
function createUser(data) {
  return {
    name: data?.name ?? null,
    username: data?.username ?? null,
    email: data?.email ?? null,

    address: {
      street: data?.address?.street ?? null,
      suite: data?.address?.suite ?? null,
      city: data?.address?.city ?? null,
      zipcode: data?.address?.zipcode ?? null,

      geo: {
        lat: data?.address?.geo?.lat ?? null,
        lng: data?.address?.geo?.lng ?? null,
      }
    },

    phone: data?.phone ?? null,
    website: data?.website ?? null,

    company: {
      name: data?.company?.name ?? null,
      catchPhrase: data?.company?.catchPhrase ?? null,
      bs: data?.company?.bs ?? null
    }
  };
}
module.exports = { 
    createUser,
};