import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { FaRupeeSign } from 'react-icons/fa';
import { Button } from '@/components/ui/button';

const steps = [
  {
    title: "Welcome to SmartSpend",
    description: "Your personal finance assistant that helps you track spending, detect fraud, and plan for the future.",
    image: "welcome"
  },
  {
    title: "Track Your Transactions",
    description: "Easily record and categorize your income and expenses to get a clear picture of your financial health.",
    image: "transactions"
  },
  {
    title: "Fraud Detection",
    description: "Our smart algorithms analyze your spending patterns to detect and alert you about potential fraudulent activities.",
    image: "fraud"
  },
  {
    title: "Spending Forecasts",
    description: "Get insights into your future spending based on your transaction history and spending patterns.",
    image: "forecast"
  }
];

const Onboarding = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };
  
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const skipOnboarding = () => {
    onComplete();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 to-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl bg-card rounded-xl shadow-xl overflow-hidden"
      >
        <div className="flex flex-col md:flex-row h-full">
          <div className="w-full md:w-1/2 p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center mb-6">
                <div className="rounded-md bg-primary p-2 mr-2">
                  <FaRupeeSign className="h-6 w-6 text-primary-foreground" />
                </div>
                <h1 className="text-2xl font-bold">SmartSpend</h1>
              </div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="mb-8"
                >
                  <h2 className="text-2xl font-bold mb-4">{steps[currentStep].title}</h2>
                  <p className="text-muted-foreground">{steps[currentStep].description}</p>
                </motion.div>
              </AnimatePresence>
            </div>
            
            <div className="flex flex-col space-y-4">
              <div className="flex justify-center space-x-2 mb-4">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 w-2 rounded-full ${
                      index === currentStep ? "bg-primary" : "bg-muted"
                    }`}
                  />
                ))}
              </div>
              
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                
                <Button onClick={skipOnboarding} variant="ghost">
                  Skip
                </Button>
                
                <Button onClick={nextStep}>
                  {currentStep === steps.length - 1 ? (
                    <>
                      Get Started
                      <Check className="ml-2 h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Next
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 bg-primary/10 p-6 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full flex items-center justify-center"
              >
                {steps[currentStep].image === "welcome" && (
                  <div className="text-center">
                    <div className="w-32 h-32 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FaRupeeSign className="h-16 w-16 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">Smart Financial Management</h3>
                    <p className="text-muted-foreground mt-2">Take control of your finances</p>
                  </div>
                )}
                
                {steps[currentStep].image === "transactions" && (
                  <div className="w-full">
                    <div className="space-y-3 max-w-sm mx-auto">
                      {[1, 2, 3].map((item) => (
                        <div 
                          key={item} 
                          className="bg-background rounded-lg p-3 flex justify-between items-center shadow-sm"
                        >
                          <div>
                            <p className="font-medium">Sample Transaction {item}</p>
                            <p className="text-xs text-muted-foreground">May 2{item}, 2025</p>
                          </div>
                          <span className="font-semibold flex items-center">
                            <FaRupeeSign className="mr-0.5 h-3 w-3" />
                            4{item}.99
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {steps[currentStep].image === "fraud" && (
                  <div className="w-full">
                    <div className="max-w-sm mx-auto bg-destructive/10 border border-destructive rounded-lg p-4 text-center">
                      <div className="w-16 h-16 bg-destructive/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-destructive" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                          <line x1="12" y1="9" x2="12" y2="13"></line>
                          <line x1="12" y1="17" x2="12.01" y2="17"></line>
                        </svg>
                      </div>
                      <h3 className="text-lg font-bold text-destructive">Potential Fraud Detected</h3>
                      <p className="text-sm mt-2 flex items-center justify-center">Unusual transaction of <FaRupeeSign className="mx-0.5 h-3 w-3" />4999.99 at Foreign Online Store</p>
                      <Button variant="destructive" className="mt-4 w-full">Review Now</Button>
                    </div>
                  </div>
                )}
                
                {steps[currentStep].image === "forecast" && (
                  <div className="w-full">
                    <div className="max-w-sm mx-auto">
                      <div className="bg-background rounded-lg p-4 shadow-sm">
                        <h3 className="font-bold mb-3">June 2025 Forecast</h3>
                        <div className="space-y-3">
                          {['Food & Dining', 'Housing', 'Transportation'].map((category) => (
                            <div key={category}>
                              <div className="flex justify-between text-sm mb-1">
                                <span>{category}</span>
                                <span className="font-medium flex items-center">
                                  <FaRupeeSign className="mr-0.5 h-3 w-3" />
                                  3500.00
                                </span>
                              </div>
                              <div className="h-2 bg-muted rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-primary rounded-full" 
                                  style={{ width: `${Math.random() * 60 + 30}%` }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 pt-3 border-t">
                          <div className="flex justify-between">
                            <span className="font-bold">Total</span>
                            <span className="font-bold flex items-center">
                              <FaRupeeSign className="mr-0.5 h-4 w-4" />
                              12500.00
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Onboarding;