// Funções de usuários 

const data = require('./data.json')

function userFindAll(){
    return data
}

function userFindById(id){
    const user = data.find(users => users.id == Number(id))
    return user
}

function userCreate(data) {
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

function userUpdateById(Older,New){
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
   
function userDeleteById(id){
    const numericId = Number(id)

    if (isNaN(numericId)){
        return { status: 'invalid_id' }
    }

    const index = data.findIndex(user =>
        user.id === numericId
    )

    if (index === -1){
        return { status: 'not_found' }
    }

    const user = data[index]

    data.splice(index, 1)

    return {
        status: 'user_deleted',
        user
    }
}

module.exports = { 
    userCreate,
    userUpdateById,
    userFindAll,
    userFindById,
    userDeleteById,
};