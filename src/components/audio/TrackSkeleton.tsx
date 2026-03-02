"use client";

import { cn } from "@/lib/utils";

export function VinylSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Vinyl Body */}
      <div className="relative aspect-square rounded-full bg-walnut/20">
        {/* Center Label */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1/3 h-1/3 rounded-full bg-walnut/30" />
        </div>
      </div>

      {/* Title */}
      <div className="mt-3 text-center">
        <div className="h-4 w-24 bg-walnut/20 rounded mx-auto" />
        <div className="h-3 w-16 bg-walnut/10 rounded mx-auto mt-2" />
      </div>
    </div>
  );
}

export function CassetteSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Cassette Body */}
      <div className="relative aspect-[1.6/1] bg-walnut/20 rounded-lg p-3">
        {/* Cassette Window */}
        <div className="absolute top-8 left-3 right-3 bottom-10 bg-walnut/30 rounded">
          {/* Tape Wheels */}
          <div className="flex items-center justify-center h-full gap-8">
            <div className="w-10 h-10 rounded-full bg-walnut/40" />
            <div className="w-10 h-10 rounded-full bg-walnut/40" />
          </div>
        </div>

        {/* Label */}
        <div className="absolute bottom-2 left-3 right-3">
          <div className="h-3 w-20 bg-walnut/30 rounded" />
          <div className="h-2 w-14 bg-walnut/20 rounded mt-1" />
        </div>
      </div>
    </div>
  );
}

interface LibrarySkeletonProps {
  count?: number;
}

export function LibrarySkeleton({ count = 10 }: LibrarySkeletonProps) {
  const originalsCount = Math.ceil(count / 2);
  const coversCount = Math.floor(count / 2);

  return (
    <section className="py-12 sm:py-16 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header Skeleton */}
        <div className="text-center mb-12 animate-pulse">
          <div className="h-10 w-64 bg-walnut/20 rounded mx-auto mb-4" />
          <div className="h-5 w-96 bg-walnut/10 rounded mx-auto" />
        </div>

        {/* Originals Section Skeleton */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6 animate-pulse">
            <div className="w-6 h-6 rounded-full bg-walnut/20" />
            <div className="h-7 w-48 bg-walnut/20 rounded" />
            <div className="flex-1 h-px bg-walnut/10" />
            <div className="h-4 w-16 bg-walnut/10 rounded" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {Array.from({ length: originalsCount }).map((_, i) => (
              <VinylSkeleton key={`vinyl-${i}`} />
            ))}
          </div>
        </div>

        {/* Covers Section Skeleton */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6 animate-pulse">
            <div className="w-6 h-6 rounded-full bg-walnut/20" />
            <div className="h-7 w-32 bg-walnut/20 rounded" />
            <div className="flex-1 h-px bg-walnut/10" />
            <div className="h-4 w-16 bg-walnut/10 rounded" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {Array.from({ length: coversCount }).map((_, i) => (
              <CassetteSkeleton key={`cassette-${i}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function HeroSkeleton() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-walnut/5 to-cream py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <div className="inline-block h-8 w-32 bg-burnt-orange/20 rounded-full mb-4" />
            <div className="h-12 w-72 bg-walnut/20 rounded mb-4 mx-auto lg:mx-0" />
            <div className="h-6 w-64 bg-walnut/10 rounded mb-6 mx-auto lg:mx-0" />

            <div className="flex gap-4 justify-center lg:justify-start mb-8">
              <div className="h-14 w-44 bg-burnt-orange/20 rounded-lg" />
              <div className="h-14 w-36 bg-walnut/10 rounded-lg" />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="h-16 bg-walnut/10 rounded" />
              <div className="h-16 bg-walnut/10 rounded" />
              <div className="h-16 bg-walnut/10 rounded" />
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2">
            <div className="aspect-[16/10] bg-walnut/20 rounded-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
