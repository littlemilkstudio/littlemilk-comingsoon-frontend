import { connect } from 'react-redux'
import NavComponent from './NavComponent'

const mapStateToProps = state => {
  const { theme } = state.app
  return {
    theme
  }
}

const mapDispatchToProps = () => ({})

const NavContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavComponent)

export default NavContainer
