import { Gift, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ReferralBanner = () => {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/15 backdrop-blur-sm mb-6">
          <Gift className="w-8 h-8 text-white" strokeWidth={2} />
        </div>
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
          Tell a Friend. Earn $25.
        </h2>
        <p className="text-white/90 text-base md:text-lg leading-relaxed mb-8 max-w-xl mx-auto">
          Love Design Cleaning? Share it. When a friend books their first clean,
          you both get $25 off your next service. No limits — refer as many people as you want.
        </p>
        <Button
          size="lg"
          className="bg-white text-emerald-700 hover:bg-white/90 font-semibold shadow-lg"
          asChild
        >
          <Link to="/referrals">
            Get My Referral Link
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default ReferralBanner;
