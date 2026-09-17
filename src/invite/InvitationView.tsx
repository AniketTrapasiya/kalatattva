"use client";

import { MotionConfig } from "framer-motion";
import { Countdown } from "./components/Countdown";
import { Couple } from "./components/Couple";
import { DateReveal } from "./components/DateReveal";
import { Footer } from "./components/Footer";
import { Functions } from "./components/Functions";
import { Hero } from "./components/Hero";
import { Instagram } from "./components/Instagram";
import { Invitation } from "./components/Invitation";
import { MusicPlayer } from "./components/MusicPlayer";
import { RSVP } from "./components/RSVP";
import { ThingsToKnow } from "./components/ThingsToKnow";
import { TraditionFilter } from "./components/TraditionFilter";
import { ShapeDefs } from "./components/ui/ShapedFrame";
import { Video } from "./components/Video";
import { Wishes } from "./components/Wishes";
import { TraditionProvider, TraditionScope } from "./context/TraditionContext";
import { weddingConfig, type Tradition } from "./data/weddingData";
import { inviteFontVars } from "./fonts";

/**
 * The ported invitation, rendered standalone (no studio header/footer — an invite
 * you send to guests shouldn't carry site nav).
 *
 * Ported note: the original cross-faded between traditions inside one SPA. Here each
 * tradition is its own route, so navigation handles that and the AnimatePresence
 * wrapper is gone; `tradition` arrives from the route.
 */
export default function InvitationView({ tradition }: { tradition: Tradition }) {
  return (
    <MotionConfig reducedMotion="user">
      <div className={inviteFontVars}>
        <TraditionProvider tradition={tradition}>
          <a
            href="#invitation"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:bg-inv-primary focus:px-4 focus:py-2 focus:text-inv-cream"
          >
            Skip to invitation
          </a>

          <ShapeDefs />

          <TraditionScope tradition={tradition}>
            <Hero />

            {/* Sits beneath the hero's fixed portal layer, so the doors open onto the invitation */}
            <main className="relative z-0">
              <Invitation />
              <DateReveal />
              <Functions />
              <Couple />
              <Instagram />
              <Video />
              <Countdown />
              <ThingsToKnow />
              <RSVP />
              <Wishes />
            </main>

            <Footer />
          </TraditionScope>

          {weddingConfig.showTraditionFilter && <TraditionFilter />}
          <MusicPlayer />
        </TraditionProvider>
      </div>
    </MotionConfig>
  );
}
