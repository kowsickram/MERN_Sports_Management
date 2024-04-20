import React, { useState } from "react";
import { Link } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function SideBar() {
  const user = JSON.parse(sessionStorage.getItem("player"));
  const master = JSON.parse(sessionStorage.getItem("master"));

  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(open);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("player");
    sessionStorage.removeItem("master");
    setTimeout(() => {
      window.location.reload();
      window.location.href = "/";
    }, 1000);
  };

  return (
    <>
      {isMobile ? (
        <>
          <AppBar position="static">
            <Toolbar className=" bg-slate-950">
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component={Link} to="/">
                <h1 className="text-lg">RVS Sports</h1>
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
            <div
              role="presentation"
              onClick={toggleDrawer(false)}
              onKeyDown={toggleDrawer(false)}
            >
              <div
                style={{ width: "250px" }}
                className="p-2 h-full text-slate-950"
              >
                {user || master ? (
                  <>
                    <Button color="inherit" component={Link} to="/">
                      Home
                    </Button>
                    <br />
                    {user ? (
                      <>
                        <Button
                          color="inherit"
                          component={Link}
                          to="/all-sports"
                        >
                          Sports
                        </Button>
                        <br />
                        <Button
                          color="inherit"
                          component={Link}
                          to="/my-sports"
                        >
                          My Sports
                        </Button>
                        <br />
                        <Button
                          onClick={handleLogout}
                          variant="contained"
                          color="secondary"
                          style={{ marginTop: "8px" }}
                        >
                          Log-out
                        </Button>
                        <br />
                      </>
                    ) : null}
                    <Button color="inherit" component={Link} to="/contact">
                      Contact Us
                    </Button>
                    <br />
                    {master ? (
                      <>
                        <Button color="inherit" component={Link} to="/master">
                          Dashboard
                        </Button>
                        <br />
                        <Button
                          color="inherit"
                          component={Link}
                          to="/sportlist"
                        >
                          List
                        </Button>
                        <br />
                        <Button color="inherit" component={Link} to="/events">
                          Events
                        </Button>

                        <Button
                          onClick={handleLogout}
                          variant="contained"
                          color="secondary"
                          style={{ marginTop: "8px" }}
                        >
                          Log-out
                        </Button>
                      </>
                    ) : null}
                  </>
                ) : (
                  <>
                    <Button color="inherit" component={Link} to="/std-reg">
                      Register
                    </Button>
                    <br />
                    <Button color="inherit" component={Link} to="/login">
                      Login
                    </Button>
                    <br />
                    <Button color="inherit" component={Link} to="/contact">
                      Contact Us
                    </Button>
                  </>
                )}
              </div>
            </div>
          </Drawer>
        </>
      ) : (
        <AppBar position="static">
          <Toolbar className="bg-slate-950">
            <Typography variant="h6" component={Link} to="/">
              <h1 className="text-lg">RVS Sports</h1>
            </Typography>
            <div style={{ marginLeft: "auto" }}>
              {user || master ? (
                <>
                  <Button color="inherit" component={Link} to="/">
                    Home
                  </Button>
                  {user ? (
                    <>
                      <Button color="inherit" component={Link} to="/all-sports">
                        Sports
                      </Button>
                      <Button color="inherit" component={Link} to="/my-sports">
                        My Sports
                      </Button>
                      <Button
                        onClick={handleLogout}
                        variant="contained"
                        style={{ marginLeft: "8px" }}
                      >
                        Log-out
                      </Button>
                    </>
                  ) : null}
                  <Button color="inherit" component={Link} to="/contact">
                    Contact Us
                  </Button>
                  {master ? (
                    <>
                      <Button color="inherit" component={Link} to="/sportlist">
                        List
                      </Button>
                      <Button color="inherit" component={Link} to="/master">
                        Dashboard
                      </Button>
                      <Button color="inherit" component={Link} to="/events">
                        Events
                      </Button>
                      <Button
                        onClick={handleLogout}
                        variant="contained"
                        style={{ marginLeft: "8px" }}
                      >
                        Log-out
                      </Button>
                    </>
                  ) : null}
                </>
              ) : (
                <>
                  <Button color="inherit" component={Link} to="/std-reg">
                    Register
                  </Button>
                  <Button color="inherit" component={Link} to="/login">
                    Login
                  </Button>
                  <Button color="inherit" component={Link} to="/contact">
                    Contact Us
                  </Button>
                </>
              )}
            </div>
          </Toolbar>
        </AppBar>
      )}
    </>
  );
}
