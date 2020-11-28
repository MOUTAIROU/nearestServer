
const createUser = ({name = '', password = ''} = { }) => (
  {
    name,
    password
  }
)

module.exports = {
  createUser
}
