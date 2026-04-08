import { CalendarDays, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const ContactOptions = () => {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Get In Touch
          </h2>
          <p className="text-muted-foreground">Choose how you'd like to connect</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Link
            to="/booking"
            className="bg-card rounded-xl p-6 text-center border border-border shadow-sm hover:shadow-md transition-all"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <CalendarDays className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-display text-lg font-semibold text-foreground mb-2">Book Online</h3>
            <p className="text-sm text-muted-foreground">Schedule your cleaning in minutes.</p>
          </Link>

          <a
            href="tel:[PHONE_DIGITS]"
            className="bg-card rounded-xl p-6 text-center border border-border shadow-sm hover:shadow-md transition-all"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Phone className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-display text-lg font-semibold text-foreground mb-2">Call Us</h3>
            <p className="text-sm text-muted-foreground">[PHONE]</p>
          </a>

          <a
            href="mailto:[EMAIL]"
            className="bg-card rounded-xl p-6 text-center border border-border shadow-sm hover:shadow-md transition-all"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-display text-lg font-semibold text-foreground mb-2">Email Us</h3>
            <p className="text-sm text-muted-foreground">[EMAIL]</p>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactOptions;
