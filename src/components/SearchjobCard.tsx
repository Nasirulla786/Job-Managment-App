//@ts-nocheck
'use client'

import React from 'react'
import { Card, Box, Text, Avatar, Flex, Button, ScrollArea, Badge } from '@radix-ui/themes'
import Link from 'next/link'

const SearchJobCard = ({ job }) => {
  return (
    <Box
      className="w-full"
      style={{
        height: '340px',
        overflow: 'hidden',


      }}
    >
      <Card
        className="h-full rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between
             bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700
             dark:from-blue-900 dark:via-blue-950 dark:to-slate-900"
        style={{
          height: '100%',
          borderRadius: '18px',
          padding: '24px',
          // boxShadow: '0 4px 18px rgba(30, 64, 175, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor:"black"
        }}
      >

        {/* Header */}
        <Flex gap="3" align="center" className="mb-2">
          {job.employer_logo ? (
            <Avatar size="3" src={job.employer_logo} fallback="?" radius="full" />
          ) : (
            <div className="w-[44px] h-[44px] rounded-xl dark:bg-blue-700 flex items-center justify-center text-blue-700 dark:text-blue-200 font-bold text-lg">
              {job.employer_name?.[0] || "C"}
            </div>
          )}
          <Box>
            <Text size="3" weight="bold" className="text-blue-900 dark:text-blue-100">
              {job.employer_name}
            </Text>
            <Text size="2" className="text-blue-600 dark:text-blue-300 font-medium block">
              {job.company?.industry || "Industry"}
            </Text>
            <Text size="1" className="text-neutral-500 dark:text-neutral-400 block">
              Owner: {job.company?.owner?.email}
            </Text>
          </Box>
        </Flex>

        {/* Job Title */}
        <Box className="mb-1">
          <Text size="4" weight="bold" className="text-blue-800 dark:text-blue-200 block truncate">
            {job.job_title || job.title}
          </Text>
          <span className="inline-block mt-1 text-xs bg-blue-100 dark:bg-blue-800/40 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full font-semibold">
            {job.job_type || "Full-time"}
          </span>
        </Box>

        {/* Description */}
        <ScrollArea
          type="auto"
          scrollbars="vertical"
          style={{
            background: 'transparent',
            borderRadius: '8px',
            padding: '0',
            height: '90px',
            overflowY: 'auto',
            fontSize: '13px',
            marginTop: '6px',
          }}
        >
          <Text className="text-neutral-700 dark:text-neutral-200 leading-snug">
            {job.job_description?.slice(0, 180) || job.description?.slice(0, 180) || "No description provided."}
          </Text>
        </ScrollArea>

        {/* Footer Section */}
        <Flex justify="between" align="center" className="mt-4">
          <Flex align="center" gap="3">
            <Badge color="blue" variant="solid" radius="full" className="text-xs font-semibold">
              {job.job_type || "Full-time"}
            </Badge>
            <Badge color="green" variant="solid" radius="full" className="text-xs font-semibold">
              ₹ {job.salary?.toLocaleString() || 'N/A'}
            </Badge>
          </Flex>

          <Link href={`/detail/${job.id || job.job_id}`}>
            <Button
              variant="solid"
              size="2"
              className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 dark:from-blue-500 dark:to-blue-700 text-white font-semibold rounded-lg px-5 py-2 shadow transition-all"
              style={{ borderRadius: '8px' }}
            >
              View Job
            </Button>
          </Link>
        </Flex>
      </Card>
    </Box>
  )
}

export default SearchJobCard
