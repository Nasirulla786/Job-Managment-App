// @ts-nocheck
'use client'
import { Button, TextArea, TextField, Heading, Flex, Box, Card } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const CompanyForm = () => {
  const [companyName, setCompanyName] = useState('');
  const [companyDes, setCompanyDes] = useState('');
  const router = useRouter();

  async function handleForm(e) {
    e.preventDefault();

    const company = {
      companyName,
      companyDes,
    };

    await fetch("/api/company", {
      method: "POST",
      body: JSON.stringify(company),
      headers: { "Content-Type": "application/json" }
    });

    router.push("/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card
        asChild
        size="4"
        className="w-full max-w-lg rounded-2xl shadow-2xl border border-green-200 dark:border-green-800 bg-white dark:bg-green-950"
      >
        <form onSubmit={handleForm}>
          <Flex direction="column" gap="5">
            <Heading size="6" align="center" className="text-green-700 dark:text-green-300 mb-2">
              Create Company
            </Heading>

            <Box>
              <TextField.Root
                placeholder="Company Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full p-4 rounded-lg bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 text-green-900 dark:text-green-100 placeholder:text-green-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                required
              />
            </Box>

            <Box>
              <TextArea
                placeholder="Company Description"
                value={companyDes}
                onChange={(e) => setCompanyDes(e.target.value)}
                rows={5}
                className="w-full p-4 rounded-lg bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 text-green-900 dark:text-green-100 placeholder:text-green-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                required
              />
            </Box>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg py-3 shadow hover:from-green-600 hover:to-emerald-700 transition"
              highContrast
              size="3"
            >
              Submit
            </Button>
          </Flex>
        </form>
      </Card>
    </div>
  );
};

export default CompanyForm;
