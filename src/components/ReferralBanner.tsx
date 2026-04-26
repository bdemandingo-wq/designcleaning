import { Gift, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ReferralBanner = () => {
  return (
    <section className="py-10 md:py-12 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/15 backdrop-blur-sm mb-4">
          <Gift className="w-6 h-6 text-white" strokeWidth={2} />
        </div>
        <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">
          Tell a Friend. Earn $25.
        </h2>
        <p className="text-white/90 text-sm md:text-base leading-relaxed mb-5 max-w-xl mx-auto">
          Love Design Cleaning? Share it. When a friend books their first clean,
          you both get $25 off your next service. No limits — refer as many people as you want.
        </p>
        <Button
          className="bg-white text-blue-700 hover:bg-white/90 font-semibold shadow-lg"
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
