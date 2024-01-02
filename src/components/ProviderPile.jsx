import PropTypes from "prop-types";
import {
  BoxProvider,
  AuthProvider,
  AmbianceProvider,
  DataProvider,
  EventProvider,
  CompteProvider
} from "../utils/context/fetchContext.jsx";

const ProviderPile = ({ children }) => {
  return (
    <BoxProvider>
      <AuthProvider>
        <AmbianceProvider>
          <DataProvider>
            <EventProvider>
              <CompteProvider>
                {children}
              </CompteProvider>
            </EventProvider>
          </DataProvider>
        </AmbianceProvider>
      </AuthProvider>
    </BoxProvider>
  )
}

ProviderPile.propTypes = {
	children: PropTypes.any,
};

export default ProviderPile