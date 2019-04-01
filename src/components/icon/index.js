import Icons from './icon'
import PropTypes from "prop-types"

function Icon({name}) {
  return Icons[name]
}

export default Icon

Icon.defaultProps = {
  name: undefined
}

Icon.propTypes = {
  name: PropTypes.string.isRequired
}