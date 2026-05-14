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

function alterUser(Older,New){
  return {
    name: New?.name ?? Older?.name,
    username: New?.username ?? Older?.username,
    email: New?.email ?? Older?.email,

    address: {
      street: New?.address?.street ?? Older?.address?.street,
      suite: New?.address?.suite ?? Older?.address?.suite,
      city: New?.address?.city ?? Older?.address?.city,
      zipcode: New?.address?.zipcode ?? Older?.address?.zipcode,

      geo: {
        lat: New?.address?.geo?.lat ?? Older?.address?.geo?.lat,
        lng: New?.address?.geo?.lng ?? Older?.address?.geo?.lng,
      }
    },

    phone: New?.phone ?? Older?.phone,
    website: New?.website ?? Older?.website,

    company: {
      name: New?.company?.name ?? Older?.company?.name,
      catchPhrase: New?.company?.catchPhrase ?? Older?.company?.catchPhrase,
      bs: New?.company?.bs ?? Older?.company?.bs
    }
  };
}

module.exports = { 
    createUser,
    alterUser
};