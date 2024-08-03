describe('Test API - User data validation', () => {
  it('Validate user data parameters against fixtures', () => {
    cy.request('GET','https://reqres.in/api/users?page=2')
    .then(response=>{
      expect(response.status).to.equal(200);
      const usersData=response.body.data;
      cy.fixture('userDataApi.json').then(fixtureData=>{
        for(let i=0;i<usersData.length;i++){
          const user=usersData[i];
          const fixtureDataUser=fixtureData.find(fixtureUser=> fixtureUser.id===user.id);
          expect(fixtureDataUser).to.exist;
          expect(user.id).to.equal(fixtureDataUser.id);
          expect(user.email).to.equal(fixtureDataUser.email);
          expect(user.first_name).to.equal(fixtureDataUser.first_name);
          expect(user.last_name).to.equal(fixtureDataUser.last_name);
        }
      });
    });
  });
});