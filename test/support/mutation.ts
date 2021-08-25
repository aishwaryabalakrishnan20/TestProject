export const TEST_QUERY_GET_CROP_GROUP = `
query ($value: String!){
  cropGroups(filter: [{key: "name", type: EQ, value: $value}]) {
    entities {
      id
    }
  }
}`;

export const TEST_MUTATION_DELETE_CROP_GROUP = `
mutation ($id:ID!) {
  deleteCropGroup(id: $id) {
    message
    success
  }
}`;

export const TEST_QUERY_GET_CROP_CLASS = `
query ($value: String!){
  cropClasses(filter: [{key: "name", type: EQ, value: $value}]) {
    entities {
      id
    }
  }
}`;

export const TEST_MUTATION_DELETE_CROP_CLASS = `
mutation ($id:ID!) {
  deleteCropClass(id: $id) {
    message
    success
  }
}`;

export const TEST_QUERY_GET_CROP_SUBCLASS = `
query ($value: String!){
  cropSubClasses(filter: [{key: "name", type: EQ, value: $value}]) {
    entities {
      id
    }
  }
}`;

export const TEST_MUTATION_DELETE_CROP_SUBCLASS = `
mutation ($id:ID!) {
  deleteCropSubClass(id: $id) {
    message
    success
  }
}`;


export const TEST_QUERY_GET_COUNTRY = `
query Countries($value: String!){
  countries(filter : [{key:"name",type:LIKE, value: $value}]) {
    entities{
      id         
    }
  }
}`
 
export const TEST_MUTATION_DELETE_COUNTRY = `
mutation DeleteCountry($id: ID!) {
  deleteCountry(id: $id){
    message
    success
  }
}`

export const TEST_QUERY_GET_REGION = `
query regions($value: String!){
  regions(filter : [{key:"name",type:LIKE, value: $value}]) {
    entities{
      id         
    }
  }
}`

export const TEST_MUTATION_DELETE_REGION = `
mutation deleteRegion($id: ID!){  
  deleteRegion( id: $id){
    message
    success
    }
}`

export const TEST_QUERY_GET_CROP_DESCRIPTION = `
query ($value: String!){
  cropDescriptions(filter: [{key: "name", type: EQ, value: $value}]) {
    entities {
      id
    }
  }
}`;
 
export const TEST_MUTATION_DELETE_CROP_DESCRIPTION = `
mutation ($id:ID!) {
  deleteCropDescription(id: $id) {
    message
    success
  }
}`;
   

 
 


