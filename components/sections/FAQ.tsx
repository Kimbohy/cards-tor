import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is the delivery time?",
    answer:
      "We ship within 24-48h. Delivery usually takes 3-5 business days in metropolitan France.",
  },
  {
    question: "Are the cards original?",
    answer:
      "Yes, all our cards are original creations. Each deck is made to order to ensure freshness.",
  },
  {
    question: "Is the stock limited?",
    answer:
      "Some editions are limited. We clearly indicate availability on each product page.",
  },
  {
    question: "Who are these cards for?",
    answer:
      "Our decks are suitable for card players, magicians, collectors and lovers of beautiful cards.",
  },
  {
    question: "How to maintain the cards?",
    answer:
      "Keep them in their box, away from moisture and direct light. Clean with a microfiber cloth.",
  },
];

export default function FAQ() {
  return (
    <section className="py-24 bg-background text-foreground">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-light mb-4 text-primary">
            Frequently Asked Questions
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </div>
        <Accordion type="single" collapsible className="w-full space-y-6">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-card border border-border rounded-lg px-8 py-4 hover:border-primary transition-all duration-300 backdrop-blur-sm"
            >
              <AccordionTrigger className="text-left text-lg font-serif text-foreground hover:text-primary transition-colors duration-300 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pt-4 text-lg">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
