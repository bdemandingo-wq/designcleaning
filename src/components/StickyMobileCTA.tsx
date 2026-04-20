import { Link, useLocation } from "react-router-dom";
import { Phone } from "lucide-react";

/**
 * Sticky bottom Book Now + Call bar shown on mobile only (<lg).
 * Hidden on the booking page itself, on auth/admin, and on the booking section
 * where it would overlap the calculator CTA. Sits at bottom-left/center,
 * leaving the right edge for the chatbot bubble (bottom-4 right-4).
 */
const HIDDEN_ROUTES = ["/booking", "/auth", "/admin", "/confirmation"];

const StickyMobileCTA = () => {
  const location = useLocation();
  if (HIDDEN_ROUTES.some((r) => location.pathname.startsWith(r))) return null;

  return (
    <>
      {/* Spacer so footer/last section content isn't covered on mobile */}
      <div aria-hidden className="h-20 lg:hidden" />
      <div
        className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-background/95 backdrop-blur-md border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.08)] pb-[env(safe-area-inset-bottom)]"
        role="region"
        aria-label="Quick actions"
      >
        <div className="px-3 py-2.5 flex gap-2 items-center max-w-md mx-auto">
          <a
            href="tel:2029359934"
            aria-label="Call (202) 935-9934"
            className="flex items-center justify-center min-w-[48px] min-h-[48px] rounded-lg border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <Phone className="w-5 h-5" />
          </a>
          <Link
            to="/booking"
            className="flex-1 inline-flex items-center justify-center min-h-[48px] px-4 rounded-lg bg-accent text-accent-foreground font-semibold text-base hover:bg-accent/90 transition-colors mr-[60px]"
          >
            Book Now
          </Link>
        </div>
      </div>
    </>
  );
};

export default StickyMobileCTA;
