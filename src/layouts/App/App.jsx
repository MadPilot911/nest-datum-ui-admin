import React from "react";
import { Outlet } from "react-router-dom";
import { hookUrlNavigate, actionApiFormClear } from "@nest-datum-ui/Store";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import SsoLayoutAuthed from "@nest-datum-ui-admin-lib/sso/src/layouts/Authed";
import MenuBreadcrumbs from "@nest-datum-ui/Menu/Breadcrumbs";
import MenuAside from "components/Menu/Aside";
import FormHeader from "components/Form/Header";
import StyledWrapper from "./Styled/Wrapper.jsx";

let App = ({ children }) => {
  const onBreadcrumbs = React.useCallback((e, { key, index }) => {
    index === 1 && actionApiFormClear("menu-tabs", { tab: 0 })();

    hookUrlNavigate(key);
  }, []);

  return (
    <StyledWrapper container spacing={3} sx={{ flexWrap: "nowrap" }}>
      <SsoLayoutAuthed>
        <Grid item sm={2} md={2} sx={{ zIndex: 2, backgroundColor: "#FFF" }}>
          <MenuAside />
        </Grid>
        <Grid item sm={12} md={10}>
          <Box pt={1} pr={2}>
            <Grid
              container
              spacing={3}
              alignItems="center"
              justifyContent="space-between"
            >
              <Grid item xs={false} sx={{ zIndex: 2, backgroundColor: "#FFF" }}>
                <MenuBreadcrumbs
                  name="breadcrumbs-header"
                  onClick={onBreadcrumbs}
                />
              </Grid>
              <Grid item xs={false} sx={{ zIndex: 2, backgroundColor: "#FFF" }}>
                <FormHeader />
              </Grid>
            </Grid>
          </Box>
          <Outlet />
          {children}
        </Grid>
      </SsoLayoutAuthed>
    </StyledWrapper>
  );
};

App = React.memo(App);
App.defaultProps = {};
App.propTypes = {};

export default App;
