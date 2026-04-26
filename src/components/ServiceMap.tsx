import { Card, CardContent } from "@/components/ui/card";
import { useSiteContent } from "@/hooks/useSiteContent";
import { useServiceAreas } from "@/hooks/useServiceAreas";

const ServiceMap = () => {
  const { get } = useSiteContent();
  const { areas } = useServiceAreas(true);

  const phoneNumber = get("contact_phone", "(202) 935-9934");
  const phoneTel = phoneNumber.replace(/\D/g, "");
  const emailAddr = get("contact_email", "DesignCleaning@proton.me");
  const hours = get("contact_hours", "Mon–Sat: 7am–7pm · Sun: 9am–5pm");
  const address = get("contact_address", "Gaithersburg, MD");
  const mapQuery = encodeURIComponent(get("contact_map_query", "Gaithersburg, MD"));

  return (
    <section id="service-map" className="py-16 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
            Serving Gaithersburg, DC &amp; the Greater DMV
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            Professional cleaning services across the DMV region — Maryland, Washington DC, and Northern Virginia.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-6 items-stretch">
          <div className="rounded-xl overflow-hidden shadow-md border border-border min-h-[340px] bg-background">
            <iframe
              title="Design Cleaning service area map"
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 340 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          <Card className="shadow-md">
            <CardContent className="p-6 md:p-8 h-full flex flex-col">
              <h3 className="font-display text-xl font-semibold text-foreground mb-5">
                Contact Design Cleaning
              </h3>
              <ul className="space-y-3 text-sm md:text-base">
                <li>
                  <span className="font-semibold text-foreground">Phone: </span>
                  <a href={`tel:${phoneTel}`} className="text-primary underline font-medium">
                    {phoneNumber}
                  </a>
                </li>
                <li>
                  <span className="font-semibold text-foreground">Email: </span>
                  <a href={`mailto:${emailAddr}`} className="text-primary underline font-medium break-all">
                    {emailAddr}
                  </a>
                </li>
                <li>
                  <span className="font-semibold text-foreground">Hours: </span>
                  <span className="text-muted-foreground">{hours}</span>
                </li>
                <li>
                  <span className="font-semibold text-foreground">Address: </span>
                  <span className="text-muted-foreground">{address}</span>
                </li>
              </ul>

              {areas.length > 0 && (
                <div className="mt-6 pt-5 border-t border-border">
                  <p className="font-semibold text-foreground text-sm mb-3">Service Areas:</p>
                  <div className="flex flex-wrap gap-2">
                    {areas.slice(0, 10).map((a) => (
                      <span
                        key={a.id}
                        className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20"
                      >
                        {a.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ServiceMap;
