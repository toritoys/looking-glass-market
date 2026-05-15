// src/data/ecosystems.js
// All narrative strings for The Looking Glass Market.
// Variable tokens: {TICKER}, {CHANGE}, {PRICE}, {DAYS}
// String rotation is sequential (index 0→1→2→0), not random.
// Inversion strings have no tokens — fixed, present-tense, 30-second display.
//
// CREATURE/ASSET MAP (Ultimate Animated Animals pack, glTF files):
// arctic_tundra      → Husky.gltf
// boreal_forest      → Wolf.gltf
// temperate_woodland → Stag.gltf
// woodland_edge      → Fox.gltf
// open_grassland     → Horse.gltf
// andean_highland    → Alpaca.gltf
// arid_scrubland     → Donkey.gltf

export const ECOSYSTEMS = {
  arctic_tundra: {
    id: 'arctic_tundra',
    environment: 'Arctic Tundra',
    creature: 'Husky',
    asset: 'Husky.gltf',
    strings: {
      flourishing: [
        "{TICKER} up {CHANGE} this week. The ice is firm and the husky runs further than it needs to. It keeps running. The horizon keeps offering itself.",
        "Up {CHANGE}. The snow is packed and fast. The husky has covered more ground in {DAYS} days than in any week before. It doesn't know where it's going. It goes anyway.",
        "{TICKER} up {CHANGE} this month. The cold is clean and the husky's coat is perfect. It runs at the edge of the ice shelf and looks down at the dark water and keeps moving."
      ],
      stable: [
        "The temperature holds. {CHANGE} this week. The husky follows the trail it knows and the trail holds.",
        "{TICKER} at {PRICE}. The tundra is as it always is — white and still and cold. The husky pulls its weight. Nothing asks more of it than that.",
        "{CHANGE} this month. The snow is the right depth. The husky knows where it's going and when to stop."
      ],
      uneasy: [
        "The wind shifted overnight. {TICKER} {CHANGE}. The husky tested the air a long time before moving.",
        "{CHANGE}. The ice is softer at the edges than it was {DAYS} days ago. The husky took a longer route. It didn't decide to.",
        "{TICKER} {CHANGE}. Something is off in the scent of the air. The husky keeps circling a patch of snow that looks like every other patch."
      ],
      stressed: [
        "The ice is unreliable now. {TICKER} {CHANGE}. The husky reads each step before it takes it. The run has become a calculation.",
        "{CHANGE} this week. The husky is working harder for the same distance. Something in the tundra is pulling back from it.",
        "{TICKER} {CHANGE}. The cold is wrong — too warm in the day, too cold at night. The husky hasn't slept through the dark in {DAYS} nights."
      ],
      crisis: [
        "The surface ice is gone. {TICKER} {CHANGE}. The husky stands at the edge of open water where the trail used to be.",
        "{CHANGE} this month. The tundra is soft ground now. The husky's paws find no purchase. It keeps moving because it doesn't know what else to do.",
        "{TICKER} down {CHANGE}. The horizon the husky ran toward for {DAYS} days is the same distance it's always been. The ice underneath it is not."
      ],
      inversion: "The tundra freezes all at once — the soft ground, the open water, the warm patches — everything locks into a surface harder and cleaner than the husky has ever run on. It runs full speed in every direction. For thirty seconds there is no edge, no breaking point, no water underneath. Then the thaw resumes."
    }
  },

  boreal_forest: {
    id: 'boreal_forest',
    environment: 'Boreal Forest',
    creature: 'Wolf',
    asset: 'Wolf.gltf',
    strings: {
      flourishing: [
        "{TICKER} up {CHANGE} this week. The prey is everywhere. The wolf has eaten every day for {DAYS} days and the pack is restless with surplus. They run when they don't need to.",
        "Up {CHANGE}. The boreal forest is loud with movement. The wolf tracks three things at once and chooses the nearest because distance feels wrong when there is this much available.",
        "{TICKER} up {CHANGE} this month. The snow is perfect for speed. The wolf outruns what it's chasing and circles back to do it again. Something about abundance makes it want to test its own edge."
      ],
      stable: [
        "The pack covers its usual ground. {CHANGE} this week. The hunt succeeds at the expected rate.",
        "{TICKER} at {PRICE}. The forest holds its territory. The wolf knows every tree on the boundary and none of them have moved.",
        "{CHANGE} this month. The prey moves in its usual patterns. The wolf moves in its usual patterns. The forest accommodates both."
      ],
      uneasy: [
        "The elk herd shifted its range {DAYS} days ago. {TICKER} {CHANGE}. The wolf tracked the shift but hasn't adjusted yet.",
        "{CHANGE}. The pack was quiet last night. No howling. The wolf doesn't know if it started the silence or just noticed it.",
        "{TICKER} {CHANGE}. The scent markers at the eastern boundary are confused. Something moved through them without understanding what they meant."
      ],
      stressed: [
        "The prey has thinned. {TICKER} {CHANGE}. The wolf is covering twice the ground for half the return. The pack is pulling apart at the edges.",
        "{CHANGE} this week. The wolf hasn't made a clean kill in {DAYS} days. It runs well. The forest is just giving it less to run toward.",
        "{TICKER} {CHANGE}. The territory is the same size. The wolf is the same wolf. What's inside the boundary has changed and the boundary doesn't know."
      ],
      crisis: [
        "The forest is quiet in a way that means something is gone. {TICKER} {CHANGE}. The wolf moves through it anyway.",
        "{CHANGE} this month. The pack has fractured. The wolf runs the old routes alone and finds the scent markers that remember when there were more of them.",
        "{TICKER} down {CHANGE}. The wolf stands at the center of its territory and howls. The forest doesn't answer. The wolf does it again."
      ],
      inversion: "The forest fills with sound all at once — elk, deer, everything that was gone returning in a single night. The wolf hunts before it has time to understand what it's hunting. The pack reassembles from different directions. For thirty seconds the territory is whole and loud and full. Then the silence begins its return."
    }
  },

  temperate_woodland: {
    id: 'temperate_woodland',
    environment: 'Temperate Woodland',
    creature: 'Stag',
    asset: 'Stag.gltf',
    strings: {
      flourishing: [
        "{TICKER} up {CHANGE} this week. The woodland is in full growth. The stag moves through it with its antlers catching light and doesn't lower its head for anything.",
        "Up {CHANGE}. The browse is deep and the stag has eaten before the other animals reach the good growth. It keeps returning to the same clearing. Not from hunger.",
        "{TICKER} up {CHANGE} this month. The stag's antlers have grown {DAYS} inches beyond last season. It keeps walking under the same branches it used to clear easily. Keeps choosing them anyway."
      ],
      stable: [
        "The woodland holds its season. {CHANGE} this week. The stag follows the trails it knows and the trails hold.",
        "{TICKER} at {PRICE}. The browse is where it always is. The stag eats in the morning and rests in the afternoon. The forest does not ask more of it today.",
        "{CHANGE} this month. The stag is neither dominant nor challenged. It moves through its range with the quiet authority of a thing that has always been here."
      ],
      uneasy: [
        "The understorey has thinned since {DAYS} days ago. {TICKER} {CHANGE}. The stag moves with slightly less cover and knows it.",
        "{CHANGE}. A younger stag entered the eastern edge of the range. No confrontation. The old stag moved west without deciding to.",
        "{TICKER} {CHANGE}. The browse is the same but it tastes different. The stag eats more of it. Tastes it again. Still can't name what changed."
      ],
      stressed: [
        "The woodland canopy is opening. {TICKER} {CHANGE}. The stag is exposed in the afternoon light and takes longer routes now, through the remaining cover.",
        "{CHANGE} this week. The stag has been challenged twice in {DAYS} days. Won both. Feels less certain than it did before.",
        "{TICKER} {CHANGE}. The browse is retreating to the woodland edges. The stag follows it and finds itself near the treeline more than it wants to be."
      ],
      crisis: [
        "The woodland has opened completely in places. {TICKER} {CHANGE}. The stag stands in full exposure and doesn't move, as if stillness is cover.",
        "{CHANGE} this month. The stag's antlers are caught in the reduced canopy twice in one morning. It backs out each time. The forest is no longer the right size.",
        "{TICKER} down {CHANGE}. The stag reaches the edge of the treeline and stops. Beyond it is open land it was not built for. The woodland behind it is almost gone."
      ],
      inversion: "The woodland closes all at once — canopy sealing, understorey thickening, the clearings filling in. The stag walks through tunnels of green that didn't exist an hour ago. Its antlers fit perfectly. For thirty seconds the forest is exactly stag-shaped. Then the clearing reasserts itself."
    }
  },

  woodland_edge: {
    id: 'woodland_edge',
    environment: 'Woodland Edge',
    creature: 'Fox',
    asset: 'Fox.gltf',
    strings: {
      flourishing: [
        "{TICKER} up {CHANGE} this week. The field-edge is full of voles and the fox has eaten before the sun is fully up every morning for {DAYS} days. It hunts in the afternoon out of habit.",
        "Up {CHANGE}. The margins between the wood and the meadow are wide and soft and the fox moves between them six times before noon. It's running routes it doesn't need to run.",
        "{TICKER} up {CHANGE} this month. The fox is perfectly placed — close enough to the wood for cover, close enough to the field for food. It sits at the exact seam between them and watches both. It has never felt more like itself."
      ],
      stable: [
        "The edge holds. {CHANGE} this week. The fox makes its rounds: wood to field and back again. Everything where it should be.",
        "{TICKER} at {PRICE}. The voles are in their usual tunnels. The rabbits are at the usual distance. The fox is where it has always worked best.",
        "{CHANGE} this month. The woodland edge is stable. The fox patrols the seam between cover and open ground and finds the seam exactly where it left it."
      ],
      uneasy: [
        "The field was cut {DAYS} days ago. {TICKER} {CHANGE}. The fox's usual approach routes are exposed now and it's been watching from the treeline, recalculating.",
        "{CHANGE}. The vole tunnels moved closer to the wood. The fox adjusted but keeps checking the old locations by reflex.",
        "{TICKER} {CHANGE}. There's a dog scent on the eastern margin that wasn't there before. The fox has shifted its range a small amount and hasn't acknowledged it."
      ],
      stressed: [
        "The field edge is shrinking. {TICKER} {CHANGE}. The fox that lives between two things is finding less of both.",
        "{CHANGE} this week. The fox is deeper in the wood than it likes to be. It can't see the field from here. It keeps moving to the edge and retreating.",
        "{TICKER} {CHANGE}. The margin the fox lives in has narrowed to a strip. It works the strip with more intensity than it did the full range. Returns the same amount."
      ],
      crisis: [
        "The edge is gone. {TICKER} {CHANGE}. The wood is the wood and the field is the field and the place the fox lives is not there today.",
        "{CHANGE} this month. The fox is in open field, fully exposed, moving fast with no particular destination. This is not what it was built for.",
        "{TICKER} down {CHANGE}. The fox sits at the treeline in full daylight. The between-place it mastered doesn't exist right now. It waits for the edge to return."
      ],
      inversion: "The margin widens to the width of a meadow — a whole new in-between that is neither wood nor field, just edge, edge all the way to the horizon. The fox runs it from end to end. For thirty seconds there is nothing but the threshold it was made for. Then the field and wood press back in."
    }
  },

  open_grassland: {
    id: 'open_grassland',
    environment: 'Open Grassland',
    creature: 'Horse',
    asset: 'Horse.gltf',
    strings: {
      flourishing: [
        "{TICKER} up {CHANGE} this week. The grass is deep and the horse has covered the whole range in {DAYS} days and found it full at every point. It runs the last mile back for no reason but the running.",
        "Up {CHANGE}. The plain is open in every direction. The horse moves fast through the long grass and doesn't stop until it's out of breath, then does it again.",
        "{TICKER} up {CHANGE} this month. The herd spreads across the widest range the horse has known. It gallops the perimeter at dawn, not from fear, just to feel how far the ground goes."
      ],
      stable: [
        "The grass is the right height. {CHANGE} this week. The horse grazes in the morning and moves in the afternoon and the plain accommodates both.",
        "{TICKER} at {PRICE}. The grassland in its ordinary state. The horse knows every part of it without thinking about it.",
        "{CHANGE} this month. The herd stays in formation. The plain is where it always was. The horse does not need to verify this but does."
      ],
      uneasy: [
        "The eastern quarter of the range is drying at the margins. {TICKER} {CHANGE}. The herd drifted west {DAYS} days ago. Nobody led them.",
        "{CHANGE}. The horse stood at a water source longer than necessary this morning. It was still full. The horse stood there anyway.",
        "{TICKER} {CHANGE}. The wind is coming from a direction that doesn't carry the usual grass scent. The horse is not spooked. It is paying attention."
      ],
      stressed: [
        "The range is drying faster than the herd can move. {TICKER} {CHANGE}. The horse covers twice the ground for the same grass.",
        "{CHANGE} this week. The water sources are down. The horse knows which ones are left and visits them in an order it didn't have {DAYS} weeks ago.",
        "{TICKER} {CHANGE}. The herd is compressing. The horse that needed open land is in close quarters and the closeness is its own pressure."
      ],
      crisis: [
        "The plain is dust. {TICKER} {CHANGE}. The horse moves through it with its head low, looking for something below the surface.",
        "{CHANGE} this month. The herd has fractured across what's left of the range. The horse runs toward the others and reaches them and has nothing to offer.",
        "{TICKER} down {CHANGE}. The horse stands in the center of a plain it has crossed a hundred times. The grass is gone. The ground is the same. The horse doesn't move."
      ],
      inversion: "Rain falls on every part of the plain simultaneously and the grass comes up in hours — thick, green, the length of a good season. The horse runs through it at full speed from one end to the other and back. For thirty seconds the plain has no edge. Then the sky clears and the sun starts its work again."
    }
  },

  andean_highland: {
    id: 'andean_highland',
    environment: 'Andean Highland',
    creature: 'Alpaca',
    asset: 'Alpaca.gltf',
    strings: {
      flourishing: [
        "{TICKER} up {CHANGE} this week. The ichu grass is thick at altitude and the alpaca grazes above the cloud line. It has not come down in {DAYS} days and doesn't need to.",
        "Up {CHANGE}. The high plateau is generous this season. The alpaca's fleece is thicker than last year. It sits in the wind at the ridge and lets the cold move through it.",
        "{TICKER} up {CHANGE} this month. The alpaca has found the highest good pasture and stays there. The view is everything and the grass is enough and the altitude costs nothing right now."
      ],
      stable: [
        "The altitude holds. {CHANGE} this week. The alpaca grazes the same ground it always has and the ground gives back the same amount.",
        "{TICKER} at {PRICE}. The highland plateau in its ordinary state — cold, still, exactly what the alpaca was built for.",
        "{CHANGE} this month. The ichu grass is neither abundant nor scarce. The alpaca eats its share and nothing shifts."
      ],
      uneasy: [
        "The frost came early this month by {DAYS} days. {TICKER} {CHANGE}. The alpaca moved slightly lower. It hasn't decided if this is temporary.",
        "{CHANGE}. The ichu is thinner at the highest pasture. The alpaca notices the difference without changing what it does about it.",
        "{TICKER} {CHANGE}. Something in the air pressure is wrong. The alpaca kept looking at the sky this morning. The sky gave nothing back."
      ],
      stressed: [
        "The high pasture is frozen over. {TICKER} {CHANGE}. The alpaca is grazing lower than it has in {DAYS} years. The grass here is different and the alpaca eats it anyway.",
        "{CHANGE} this week. The herd is below the cloud line for the first time this season. The alpaca keeps looking up at where the pasture should be.",
        "{TICKER} {CHANGE}. The cold at altitude is the wrong kind now — wet and grey instead of dry and still. The alpaca's fleece is damp. This has not happened before."
      ],
      crisis: [
        "The highland is snow-locked. {TICKER} {CHANGE}. The alpaca is on the valley floor in grass it doesn't recognize, eating from unfamiliar ground.",
        "{CHANGE} this month. The alpaca's herd has scattered across lower elevations. The animal built for a specific altitude has none of it left.",
        "{TICKER} down {CHANGE}. The alpaca stands on the lower slope and looks up at the ridge it came from. The ridge is white and closed. It waits."
      ],
      inversion: "The snow melts from the highland all at once and the ichu comes up green to the very top of the ridge. The alpaca climbs without stopping. It reaches the highest point it has ever reached and the grass is there too. For thirty seconds the mountain has no ceiling. Then the cold returns and the alpaca begins its slow descent."
    }
  },

  arid_scrubland: {
    id: 'arid_scrubland',
    environment: 'Arid Scrubland',
    creature: 'Donkey',
    asset: 'Donkey.gltf',
    strings: {
      flourishing: [
        "{TICKER} up {CHANGE} this week. The scrub has flowered after the rains and the donkey moves through it slowly, eating things it has never eaten before. It is not sure about any of them. It keeps eating.",
        "Up {CHANGE}. The waterholes are full. The donkey has drunk its fill every day for {DAYS} days and each time still checks the level before leaving. Old habit. New water.",
        "{TICKER} up {CHANGE} this month. The scrubland is green in patches it's never been green before. The donkey stands in one of those patches for a long time. Then moves to another."
      ],
      stable: [
        "The scrub is dry and the donkey knows where the water is. {CHANGE} this week. Nothing has changed the arrangement.",
        "{TICKER} at {PRICE}. The arid land in its ordinary state. The donkey covers its ground slowly, finds what it needs, and doesn't ask for more.",
        "{CHANGE} this month. The scrubland keeps its deal: sparse, predictable, survivable. The donkey has made its peace with this."
      ],
      uneasy: [
        "One of the usual waterholes is lower than {DAYS} days ago. {TICKER} {CHANGE}. The donkey visited it twice this morning. Checked both times. Left both times.",
        "{CHANGE}. The shade trees at the dry riverbed are thinner than they were. The donkey rests there longer now, in less shade.",
        "{TICKER} {CHANGE}. The scrub is the same but the donkey keeps testing different routes. Finding the same amounts of the same things in different order."
      ],
      stressed: [
        "The waterholes are down by half. {TICKER} {CHANGE}. The donkey knows which ones are left and has built a new circuit in {DAYS} days. The circuit is longer.",
        "{CHANGE} this week. The shade is insufficient in the afternoon. The donkey stands at the thornbush perimeter and gets what cover it offers. This is not enough.",
        "{TICKER} {CHANGE}. The scrub is drying from the edges inward. The donkey works harder for the same forage. The land isn't hostile. It's just becoming less."
      ],
      crisis: [
        "The last waterhole is a mud patch. {TICKER} {CHANGE}. The donkey stands in it and waits in the full sun.",
        "{CHANGE} this month. The scrubland has nothing left that the donkey recognizes as food. It covers the same ground out of pattern, not need.",
        "{TICKER} down {CHANGE}. The donkey hasn't moved far in {DAYS} days. The land asks nothing of it because there is nothing left to ask for. It stands. It waits."
      ],
      inversion: "Rain falls on the scrubland for a full hour and the ground takes all of it. The waterholes fill before the donkey reaches them. It drinks for a long time, checks the level, drinks again. The scrub smells like it did once before, years back, after another rain it didn't expect. For thirty seconds the land is generous. The donkey doesn't trust it. Then the sun returns and they are even again."
    }
  }
};
