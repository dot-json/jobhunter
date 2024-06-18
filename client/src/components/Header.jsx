import { useState } from "react";
import { cn } from "../lib/utils";
import {
  Header as HeaderShell,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  Theme,
} from "@carbon/react";
import { useNavigate } from "react-router-dom";
import { Login, Add, Logout } from "@carbon/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../lib/actions/userActions";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const user = useSelector((state) => state.user.user);
  const toggleUserMenu = () => {
    setUserMenuOpen((prev) => !prev);
  };

  return (
    <Theme theme="g100">
      <div
        className={cn("sticky top-0 w-full bg-cds-background")}
        style={{ borderBottom: "1px solid #393939" }}
      >
        <HeaderShell
          aria-label="Jobhunter"
          className={cn("container relative border-b-0 p-0")}
        >
          <HeaderName href="/" prefix="">
            Jobhunter
          </HeaderName>
          {user && (
            <HeaderNavigation aria-label="Carbon Design System">
              <HeaderMenuItem href="/dashboard">Profil</HeaderMenuItem>
              {user.role === "company" && (
                <>
                  <HeaderMenuItem href="/my-adverts">
                    Hirdetéseim
                  </HeaderMenuItem>
                  <HeaderMenuItem href="/advert">Új hirdetés</HeaderMenuItem>
                </>
              )}
            </HeaderNavigation>
          )}

          <div className={cn("flex size-full items-center justify-end")}>
            {!user ? (
              <>
                <a
                  href="/login"
                  className={cn(
                    "flex h-full items-center gap-1 px-5 text-sm text-[#c6c6c6] transition-colors hover:bg-cds-hover hover:text-white active:bg-cds-active",
                  )}
                >
                  <Login size={18} />
                  Bejelentkezés
                </a>
                <a
                  href="/register"
                  className={cn(
                    "flex h-full items-center gap-1 px-5 text-sm text-[#c6c6c6] transition-colors hover:bg-cds-hover hover:text-white active:bg-cds-active",
                  )}
                >
                  <Add size={18} />
                  Regisztráció
                </a>
              </>
            ) : (
              <button
                type="button"
                className={cn(
                  "flex h-full place-items-center gap-1 px-5 text-sm text-[#c6c6c6] transition-colors hover:bg-[#da1e28] hover:text-white active:bg-[#750e13]",
                )}
                onClick={() => {
                  dispatch(logoutUser());
                  navigate("/");
                }}
              >
                <Logout size={20} />
                Kijelentkezés
              </button>
            )}
          </div>
          <AnimatePresence>
            {userMenuOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.08 }}
                className={cn(
                  "absolute right-0 top-12 flex w-full max-w-xs flex-col gap-2 overflow-hidden border border-cds-border bg-cds-background p-6",
                )}
              >
                {!user ? (
                  <>
                    <a
                      href="/login"
                      className={cn(
                        "flex w-full items-center gap-2 px-4 py-3 transition-colors hover:bg-cds-hover active:bg-cds-active",
                      )}
                      onClick={toggleUserMenu}
                    >
                      <Login size={24} />
                      <span>Login</span>
                    </a>
                    <a
                      href="/register"
                      className={cn(
                        "flex w-full items-center gap-2 px-4 py-3 transition-colors hover:bg-cds-hover active:bg-cds-active",
                      )}
                      onClick={toggleUserMenu}
                    >
                      <Add size={24} />
                      <span>Register</span>
                    </a>
                  </>
                ) : (
                  <>
                    <div className={cn("flex flex-col gap-2")}>
                      <h1 className={cn("text-xl")}>{user.fullname}</h1>
                      <hr className={cn("border-t-cds-border")} />
                    </div>
                    <button
                      type="button"
                      className={cn(
                        "flex w-full items-center gap-2 px-4 py-3 transition-colors hover:bg-cds-hover active:bg-cds-active",
                      )}
                      onClick={() => {
                        toggleUserMenu();
                        logoutUser();
                        window.location.reload();
                      }}
                    >
                      <Logout size={24} />
                      Log Out
                    </button>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </HeaderShell>
      </div>
    </Theme>
  );
};

export default Header;
