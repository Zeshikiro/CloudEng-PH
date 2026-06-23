'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/components/AuthProvider';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, profile, loading, signOut } = useAuth();
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const getInitials = () => {
    const name = profile?.display_name || user?.email || '?';
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-slate-900/80 backdrop-blur-xl shadow-lg shadow-blue-500/5 border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-shadow duration-300">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300" />
            </div>
            <div>
              <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                CloudEng
              </span>
              <span className="text-xs text-slate-500 block -mt-1 tracking-wider">PH</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            <NavLink href="/" label="Home" />
            <NavLink href="/lesson-1" label="Lessons" />
            <NavLink href="/labs/aws-setup" label="Labs" />
            <NavLink href="/leaderboard" label="Leaderboard" />
            <NavLink href="/playground" label="Playground" />
          </div>

          {/* Auth + Mobile Menu */}
          <div className="flex items-center gap-3">
            {/* Auth Buttons (Desktop) */}
            <div className="hidden md:flex items-center gap-2">
              {loading ? (
                <div className="w-8 h-8 rounded-full bg-slate-800 animate-pulse" />
              ) : user ? (
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] transition-all duration-200"
                  >
                    <span className="text-sm text-slate-300 max-w-[120px] truncate">
                      {profile?.display_name || user.email?.split('@')[0]}
                    </span>
                    {profile?.avatar_url ? (
                      <img
                        src={profile.avatar_url}
                        alt="Avatar"
                        className="w-7 h-7 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-[10px] font-bold text-white">
                        {getInitials()}
                      </div>
                    )}
                  </button>

                  {/* Profile Dropdown */}
                  {profileOpen && (
                    <div className="absolute right-0 mt-2 w-56 rounded-xl bg-slate-900/95 backdrop-blur-xl border border-white/[0.08] shadow-xl shadow-black/30 overflow-hidden animate-fade-in">
                      <div className="p-3 border-b border-white/[0.06]">
                        <p className="text-sm font-medium text-white truncate">
                          {profile?.display_name || 'Cloud Learner'}
                        </p>
                        <p className="text-xs text-slate-500 truncate">{user.email}</p>
                      </div>
                      <div className="py-1">
                        <DropdownItem
                          icon={
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                            </svg>
                          }
                          label="Dashboard"
                          href="/dashboard"
                          onClick={() => setProfileOpen(false)}
                        />
                        <button
                          onClick={async () => {
                            await signOut();
                            setProfileOpen(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                          </svg>
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="px-4 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-200"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/login"
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-semibold hover:from-blue-400 hover:to-purple-500 transition-all duration-300 shadow-md shadow-blue-500/20"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-96 border-b border-white/5' : 'max-h-0'
        }`}
      >
        <div className="px-4 py-3 space-y-1 bg-slate-900/95 backdrop-blur-xl">
          <MobileNavLink href="/" label="Home" onClick={() => setMenuOpen(false)} />
          <MobileNavLink href="/lessons" label="Lessons" onClick={() => setMenuOpen(false)} />
          <MobileNavLink href="/labs/aws-setup" label="Labs" onClick={() => setMenuOpen(false)} />
          <MobileNavLink href="/leaderboard" label="Leaderboard" onClick={() => setMenuOpen(false)} />
          <MobileNavLink href="/playground" label="Playground" onClick={() => setMenuOpen(false)} />

          <div className="pt-2 border-t border-white/[0.06] mt-2">
            {user ? (
              <>
                <div className="px-4 py-2 text-sm text-slate-400">
                  👤 {profile?.display_name || user.email?.split('@')[0]}
                </div>
                <button
                  onClick={async () => {
                    await signOut();
                    setMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <MobileNavLink href="/login" label="Log In / Sign Up" onClick={() => setMenuOpen(false)} />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="relative px-4 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-200"
    >
      {label}
    </Link>
  );
}

function MobileNavLink({ href, label, onClick }: { href: string; label: string; onClick: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block px-4 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
    >
      {label}
    </Link>
  );
}

function DropdownItem({ icon, label, href, onClick }: { icon: React.ReactNode; label: string; href: string; onClick: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:bg-white/[0.04] transition-colors"
    >
      {icon}
      {label}
    </Link>
  );
}
