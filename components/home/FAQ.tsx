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
    question: "Are the cards authentic?",
    answer:
      "Yes, all our cards come from official premium playing card manufacturers. We guarantee authenticity and quality.",
  },
  {
    question: "Is the stock limited?",
    answer:
      "Some premium editions are limited productions. We clearly indicate availability on each product page.",
  },
  {
    question: "Who are these cards for?",
    answer:
      "Our decks are perfect for cardistry practitioners, magicians, card game players, and collectors who appreciate premium quality.",
  },
  {
    question: "How to maintain the cards?",
    answer:
      "Keep them in their box, away from moisture and direct light. Clean with a microfiber cloth.",
  },
];

export default function FAQ() {
  return (
    <section
      id="FAQ"
      className="py-12 sm:py-16 md:py-20 lg:py-24 bg-background text-foreground"
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light mb-4 text-foreground">
            Frequently Asked Questions
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-accent mx-auto"></div>
        </div>
        <Accordion
          type="single"
          collapsible
          className="w-full space-y-4 sm:space-y-6"
        >
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-card border border-border rounded-lg px-4 sm:px-6 md:px-8 py-3 sm:py-4 hover:border-accent backdrop-blur-sm transition-colors"
            >
              <AccordionTrigger className="text-left text-base sm:text-lg font-serif text-foreground hover:text-accent transition-colors duration-300 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pt-3 sm:pt-4 text-sm sm:text-base md:text-lg">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
