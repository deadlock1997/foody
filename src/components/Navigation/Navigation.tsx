"use client";
import UserContext from "@/context/user/UserContext";
import {
  Box,
  Button,
  Divider,
  Drawer,
  Grid2,
  IconButton,
  Link,
  List,
  ListItem,
} from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import React, { useContext } from "react";
import { IsOnHomePage, IsOnSignUpPage } from "./Navigation.functions";
import LogFoodModal from "../LogFoodModal/LogFoodModal";
import { FoodyIcon } from "../Common/Icons/FoodyIcon";
import MenuIcon from "@mui/icons-material/Menu";
import { SessionType } from "@/types/session";
import { nav_link_active, nav_link, x_padding } from "@/contant";
import {
  generalLinksBox,
  navDivider,
  userLinksBox,
  quickLinksBox,
  mobileNavBox,
  iconButtonStyle,
  drawerPaperStyle,
  foodyIconBoxStyle,
  LinksContainerStyle,
} from "./Navigation.styles";

const GeneralLinks = () => {
  const location = usePathname();
  return (
    <Box sx={generalLinksBox}>
      <Link
        href="/signup"
        sx={IsOnSignUpPage(location) ? nav_link_active : nav_link}
      >
        Sign up
      </Link>
      <Divider
        aria-hidden="true"
        orientation="vertical"
        variant="middle"
        flexItem
        sx={navDivider}
      />
      <Link href="/" sx={IsOnHomePage(location) ? nav_link_active : nav_link}>
        Sign in
      </Link>
    </Box>
  );
};

const UserLinks = () => {
  const router = useRouter();
  const { setSession } = useContext(UserContext);
  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setSession({} as SessionType);
    router.push("/");
  };
  const [open, setOpen] = React.useState(false);
  return (
    <Box sx={userLinksBox}>
      <Box sx={quickLinksBox}>
        <LogFoodModal
          open={open}
          handleClose={() => {
            setOpen(false);
          }}
        />
        <Button variant="contained" onClick={() => setOpen(true)}>
          Record Your Bites
        </Button>
      </Box>
      <Divider
        aria-hidden="true"
        orientation="vertical"
        variant="middle"
        flexItem
      />
      <Link onClick={handleLogout} sx={{ ...nav_link, cursor: "pointer" }}>
        Logout
      </Link>
    </Box>
  );
};

const UserLinksMobile = () => {
  const router = useRouter();
  const { setSession } = useContext(UserContext);
  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setSession({} as SessionType);
    router.push("/");
  };
  const [open, setOpen] = React.useState(false);
  return (
    <List>
      <ListItem>
        <LogFoodModal
          open={open}
          handleClose={() => {
            setOpen(false);
          }}
        />
        <Button fullWidth variant="contained" onClick={() => setOpen(true)}>
          Record Your Bites
        </Button>
      </ListItem>
      <ListItem>
        <Button variant="outlined" onClick={handleLogout} fullWidth>
          Logout
        </Button>
      </ListItem>
    </List>
  );
};

const GeneralLinksMobile = () => {
  const location = usePathname();
  return (
    <Box sx={generalLinksBox}>
      {!IsOnSignUpPage(location) && (
        <Link href="/signup" sx={nav_link}>
          Sign up
        </Link>
      )}
      {!IsOnHomePage(location) && (
        <Link href="/" sx={IsOnHomePage(location) ? nav_link_active : nav_link}>
          Sign in
        </Link>
      )}
    </Box>
  );
};

export default function Navigation() {
  const { session } = useContext(UserContext);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const router = useRouter();
  const location = usePathname();
  return (
    <Box role="navigation" sx={{ px: x_padding, py: 2 }}>
      <Divider aria-hidden="true" sx={navDivider} />
      <Grid2 container>
        <Grid2 size={4} px={2}>
          <FoodyIcon
            onClick={() => {
              if (session?.userName) {
                router.push("/dashboard");
              }
            }}
            style={{
              ...foodyIconBoxStyle,
              cursor:
                session?.userName && location !== "/dashboard" ? "pointer" : "",
            }}
          />
        </Grid2>
        <Grid2 size={8}>
          <Box
            sx={LinksContainerStyle}
          >
            {session?.userName ? <UserLinks /> : <GeneralLinks />}
          </Box>

          <Box sx={mobileNavBox}>
            {session?.userName ? (
              <>
                <IconButton sx={iconButtonStyle}>
                  <MenuIcon onClick={() => setOpenDrawer(true)} />
                </IconButton>
                <Drawer
                  anchor={"bottom"}
                  open={openDrawer}
                  onClose={() => {
                    setOpenDrawer(false);
                  }}
                  sx={drawerPaperStyle}
                >
                  <UserLinksMobile />
                </Drawer>
              </>
            ) : (
              <GeneralLinksMobile />
            )}
          </Box>
        </Grid2>
      </Grid2>
      <Divider aria-hidden="true" sx={navDivider} />
    </Box>
  );
}
