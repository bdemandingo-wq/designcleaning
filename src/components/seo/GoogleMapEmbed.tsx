const GoogleMapEmbed = () => {
  return (
    <section className="py-12 bg-muted" aria-label="Location and Contact Information">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="font-display text-3xl font-bold text-foreground mb-4">
            Serving Pembroke Pines & Surrounding Areas
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Professional cleaning services throughout South Florida and the greater Broward County area.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="rounded-xl overflow-hidden shadow-lg border border-border h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d220474.2655!2d-81.8!3d30.33!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e5b716f1ceafeb%3A0xc4cd7d3896fcc7e2!2sPembroke Pines%2C%20FL!5e0!3m2!1sen!2sus!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Pleasant Cleanings Service Area - South Florida"
            />
          </div>

          <div className="bg-card p-8 rounded-xl shadow-soft border border-border">
            <h3 className="font-display text-xl font-semibold text-foreground mb-6">
              Contact Pleasant Cleanings
            </h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-muted-foreground">
                  <strong>Phone:</strong>{" "}
                  <a 
                    href="tel:+17867967445" 
                    className="text-primary hover:underline"
                    aria-label="Call Pleasant Cleanings at (786) 796-7445"
                  >
                    (786) 796-7445
                  </a>
                </p>
              </div>
              
              <div>
                <p className="text-muted-foreground">
                  <strong>Email:</strong>{" "}
                  <a 
                    href="mailto:support@pleasantcleanings.com" 
                    className="text-primary hover:underline"
                  >
                    support@pleasantcleanings.com
                  </a>
                </p>
              </div>
              
              <div>
                <p className="text-muted-foreground">
                  <strong>Hours:</strong> Mon-Fri 7AM-7PM, Sat 8AM-5PM
                </p>
              </div>

              <div>
                <p className="text-muted-foreground">
                  <strong>Location:</strong> South Florida
                </p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground mb-4">
                <strong>Service Areas:</strong>
              </p>
              <div className="flex flex-wrap gap-2">
                <a href="/jacksonville-cleaning" className="text-xs bg-primary/10 text-primary px-2 py-1 rounded hover:bg-primary/20 transition-colors">Pembroke Pines</a>
                <a href="/jacksonville-beach-cleaning" className="text-xs bg-primary/10 text-primary px-2 py-1 rounded hover:bg-primary/20 transition-colors">Pembroke Pines Beach</a>
                <a href="/ponte-vedra-beach-cleaning" className="text-xs bg-primary/10 text-primary px-2 py-1 rounded hover:bg-primary/20 transition-colors">Ponte Vedra Beach</a>
                <a href="/mandarin-cleaning" className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded hover:bg-primary/10 hover:text-primary transition-colors">Mandarin</a>
                <a href="/riverside-cleaning" className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded hover:bg-primary/10 hover:text-primary transition-colors">Riverside</a>
                <a href="/southside-cleaning" className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded hover:bg-primary/10 hover:text-primary transition-colors">Southside</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoogleMapEmbed;
