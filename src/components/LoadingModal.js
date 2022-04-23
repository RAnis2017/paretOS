import { useEffect, useState } from "react";
import { DialogContent, useTheme } from "@mui/material";
import Button from "react-bootstrap/lib/Button";
import { quotes } from "../libs/quotes";

const randomIndex = Math.floor(Math.random() * Math.floor(quotes.length));

/**
 * This component is responsible for showing some sweet motivational quotes while everything loads.
 * @TODO Issue #53
 */

const LoadingModal = ({ isLoading = false }) => {
  const theme = useTheme();
  const [showLogout, setShowLogout] = useState(false);
  const [timeoutRef, setTimeoutRef] = useState(null);

  useEffect(() => {
    if (isLoading === true) {
      if (timeoutRef !== null) {
        clearTimeout(timeoutRef);
      }

      setTimeoutRef(
        setTimeout(() => {
          setShowLogout(true);
        }, 1000 * 20)
      );
    } else if (isLoading === false && timeoutRef !== null) {
      clearTimeout(timeoutRef);
    }
  }, [isLoading]);

  return (
    <>
      <DialogContent
        style={{
          backgroundColor: theme.palette.background.default,
          overflow: "visible",
          textAlign: "center",
        }}
      >
        <div className="ipl-progress-indicator" id="spinner">
          <h1 id="header">Un Momento</h1>
          <div className="lds-dual-ring" />
        </div>{" "}
        <div style={{ marginBottom: 400, marginTop: 100 }}>
          <div
            style={{
              textAlign: "center",
              color: theme.palette.text.primary,
              fontSize: 24,
              marginRight: "20%",
              marginLeft: "20%",
            }}
            id="now-loading"
          >
            {quotes[randomIndex].quote}
          </div>
          <div
            style={{
              textAlign: "center",
              color: theme.palette.text.primary,
              fontSize: 20,
            }}
          >
            {quotes[randomIndex].author}
          </div>
        </div>
        {showLogout ? (
          <Button onClick={() => window.location.replace("/logout")}>
            Logout
          </Button>
        ) : (
          <></>
        )}
      </DialogContent>
    </>
  );
};

export default LoadingModal;
