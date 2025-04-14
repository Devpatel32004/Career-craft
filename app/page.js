import Herosection from "@/components/Herosection";
import { features } from "@/data/features";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { howItWorks } from "@/data/howitworks";
import { testimonial } from "@/data/testimonials";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/data/faqs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div>
      <div className="grid-background"></div>

      {/*Hero section*/}
      <Herosection />

      {/*features section*/}

      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Powerful Features for Your Career Growth
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="h-full transition-all hover:border-primary"
              >
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full bg-primary/10 p-2">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-lg font-semibold">
                      {feature.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-12 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            <div className="flex flex-col items-center justify-center space-y-2">
              <h3 className="text-4xl font-bold">50+</h3>
              <p className="text-muted-foreground">Industries Covered</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2">
              <h3 className="text-4xl font-bold">1000+</h3>
              <p className="text-muted-foreground">Interview Questions</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2">
              <h3 className="text-4xl font-bold">95%</h3>
              <p className="text-muted-foreground">Success Rate</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2">
              <h3 className="text-4xl font-bold">24/7</h3>
              <p className="text-muted-foreground">AI Support</p>
            </div>
          </div>
        </div>
      </section>

      {/*how it works section*/}

      <section className="w-full py-12 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl w-full mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-5">How It Works</h2>
            <p className="text-md text-muted-foreground">
              Four simple steps to accelerate your career growth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {howItWorks.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-xl">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*testimonials section*/}
      <section className="w-full py-12 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonial.map((testimonial, index) => (
              <Card key={index} className="bg-background">
                <CardContent className="pt-6">
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="relative h-12 w-12 flex-shrink-0">
                        <Image
                          width={40}
                          height={40}
                          src={testimonial.image}
                          alt={testimonial.author}
                          className="rounded-full object-cover border-2 border-primary/20"
                        />
                      </div>
                      <div>
                        <p className="font-semibold">{testimonial.author}</p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </p>
                        <p className="text-sm text-primary">
                          {testimonial.company}
                        </p>
                      </div>
                    </div>
                    <blockquote>
                      <p className="text-muted-foreground italic relative">
                        <span className="text-3xl text-primary absolute -top-4 -left-2">
                          &quot;
                        </span>
                        {testimonial.quote}
                        <span className="text-3xl text-primary absolute -bottom-4">
                          &quot;
                        </span>
                      </p>
                    </blockquote>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/*FAQ  section*/}
      <section className="w-full py-12 md:py-24 bg-transparent">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl w-full mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-5">
              Frequently Asked Questions
            </h2>
            <p className="text-md text-muted-foreground">
              Find answers to common questions about our platform
            </p>
          </div>

          <div className="grid grid-cols-1 gap-2 max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="flex flex-col justify-start text-start space-y-1"
              >
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                </Accordion>
                <hr />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <div className="w-full">
        <div className="bg-white py-24 mx-auto rounded-lg  gradient ">
          <div className="flex flex-col justify-center items-center space-y-4">
            <h1 className="font-bold text-secondary text-3xl md:text-4xl lg:text-5xl text-center">
              Ready to Accelerate Your Career?
            </h1>
            <div className="text-secondary md:text-xl text-md max-w-xl text-center">
              Join thousands of professionals who are advancing their careers
              with AI-powered guidance.
            </div>
            <Link href={"/dashboard"} passHref>
              <Button
                size="lg"
                variant="secondary"
                className="mt-5 animate-bounce h-11"
              >
                <div className="px-2.5 flex items-center space-x-4">
                  <span>Start Your Journey Today </span>
                  <ArrowRight className="size-4" />
                </div>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
