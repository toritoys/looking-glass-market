// src/data/ecosystems.js
// All narrative strings for The Looking Glass Market.
// Variable tokens: {TICKER}, {CHANGE}, {PRICE}, {DAYS}
// String rotation is sequential (index 0→1→2→0), not random.
// Inversion strings have no tokens — fixed, present-tense, 30-second display.

export const ECOSYSTEMS = {
  temperate_forest: {
    id: 'temperate_forest',
    environment: 'Temperate Forest',
    creature: 'Beaver',
    strings: {
      flourishing: [
        "{TICKER} up {CHANGE} this week. The river is higher than the beaver has ever seen it. It keeps checking the dam walls.",
        "Up {CHANGE}. The willow branches are heavy with growth. The beaver takes more than it needs and doesn't know why.",
        "{TICKER} up {CHANGE} this month. The stores are full. The water is still rising. The beaver watches the sky."
      ],
      stable: [
        "The current is steady. {CHANGE} this week — barely felt. The dam needs minor repairs. Nothing urgent.",
        "The river is where it was yesterday. {TICKER} at {PRICE}. The beaver moves through habit, not hunger.",
        "{CHANGE} this month. The forest is neither generous nor withholding. The work continues."
      ],
      uneasy: [
        "The water level dropped {CHANGE} since {DAYS} days ago. Small. But the beaver noticed.",
        "Something is different about the current. {TICKER} {CHANGE}. The dam feels less certain than it did.",
        "The beaver checks the stores more than necessary. {CHANGE}. Not panic. Not yet."
      ],
      stressed: [
        "The river is {CHANGE} below where it should be. The mud is wrong. The beaver works twice as hard to hold what's already built.",
        "{TICKER} {CHANGE} this week. The dam is showing. The beaver hasn't slept through the night in {DAYS} days.",
        "The stores are low. {CHANGE}. The beaver keeps building. There is nothing else to do."
      ],
      crisis: [
        "The riverbed is exposed. {TICKER} {CHANGE}. The dam stands over nothing.",
        "{CHANGE} this month. The beaver sits at the edge of what used to be water. The work was real. The river left anyway.",
        "{TICKER} down {CHANGE}. The willow roots are dry. The beaver hasn't moved since morning."
      ],
      inversion: "The dam holds water it didn't build for. The beaver stands inside the flood and understands, for thirty seconds, what it feels like to be on the other side of the current. Then the water finds its level again."
    }
  },

  tropical_rainforest: {
    id: 'tropical_rainforest',
    environment: 'Tropical Rainforest',
    creature: 'Poison Dart Frog',
    strings: {
      flourishing: [
        "{TICKER} up {CHANGE} this week. The canopy has closed completely. The frog hasn't seen the sky in {DAYS} days and doesn't need to.",
        "Up {CHANGE}. The insects are everywhere. More than the frog can eat. It keeps hunting anyway, not sure why.",
        "{TICKER} up {CHANGE} this month. The rain hasn't stopped. The frog sits at the center of everything it needs and feels, strangely, like leaving."
      ],
      stable: [
        "The humidity holds. {CHANGE} this week. The frog moves through the understory the same way it did yesterday.",
        "{TICKER} at {PRICE}. The rain comes at the same hour it always does. The frog is exactly where it should be.",
        "{CHANGE} this month. The canopy filters the same pale light. The insects are where they always are. The frog eats."
      ],
      uneasy: [
        "The rain was shorter this morning. {TICKER} {CHANGE}. The frog noticed the gap between drops.",
        "{CHANGE}. The leaf litter is drier than it was {DAYS} days ago. The frog's skin feels different. Not wrong. Not yet.",
        "{TICKER} {CHANGE}. One of the usual insects hasn't appeared today. Could be nothing. The frog waits."
      ],
      stressed: [
        "The canopy is thinning. {TICKER} {CHANGE}. The frog can see patches of sky it has never seen before and doesn't want.",
        "{CHANGE} this week. The insects are fewer and faster. The frog spends twice the energy for half the return.",
        "{TICKER} {CHANGE}. The humidity dropped again last night. The frog's color is still bright but the brightness costs more now."
      ],
      crisis: [
        "The canopy is gone in places. {TICKER} {CHANGE}. The frog sits in direct light for the first time. It doesn't move.",
        "{CHANGE} this month. The frog's poison is fading. Without the right food there is nothing left to defend with.",
        "{TICKER} down {CHANGE}. The rain hasn't come. The frog is still vivid, still visible. There is nowhere left to hide."
      ],
      inversion: "The rain falls upward. The frog watches it go. Everything it was built for is running in the wrong direction and it is, briefly, the most itself it has ever been."
    }
  },

  swamp_bayou: {
    id: 'swamp_bayou',
    environment: 'Swamp / Bayou',
    creature: 'Alligator',
    strings: {
      flourishing: [
        "{TICKER} up {CHANGE} this week. The water is high and warm. The alligator hasn't had to move toward anything in {DAYS} days. Things come to it.",
        "Up {CHANGE}. The bayou is full. The alligator floats at the surface, barely visible, and waits. Something always comes.",
        "{TICKER} up {CHANGE} this month. The alligator has eaten well. It rests in the shallows and watches the waterline. It has never been this still and this dangerous at the same time."
      ],
      stable: [
        "The water temperature holds. {CHANGE} this week. The alligator moves through its usual circuit without urgency.",
        "{TICKER} at {PRICE}. The bayou is neither rising nor falling. The alligator does what it has always done.",
        "{CHANGE} this month. The prey is predictable. The sun is where it should be. The alligator does not think about this."
      ],
      uneasy: [
        "The water is cooler this morning. {TICKER} {CHANGE}. The alligator moved to the shallower bank without deciding to.",
        "{CHANGE}. The usual birds are quieter than {DAYS} days ago. The alligator reads this but doesn't act on it yet.",
        "{TICKER} {CHANGE}. The waterline dropped a little overnight. The alligator's back is more exposed than it likes."
      ],
      stressed: [
        "The water is pulling back. {TICKER} {CHANGE}. The alligator follows it, pressing into the shrinking center.",
        "{CHANGE} this week. The alligator's belly is on mud that was water {DAYS} days ago. It cannot regulate in mud.",
        "{TICKER} {CHANGE}. The sun hits the alligator directly now. It is too warm and too exposed and both at the same time."
      ],
      crisis: [
        "The water is almost gone. {TICKER} {CHANGE}. The alligator lies in the remaining inches and does not move.",
        "{CHANGE} this month. The bayou is cracked earth from bank to bank. The alligator is cold and visible and waiting for something it cannot name.",
        "{TICKER} down {CHANGE}. The alligator has not eaten in {DAYS} days. It is still here. That is all it knows how to be."
      ],
      inversion: "The swamp fills all at once. The alligator feels the warm water return around it like a memory. For thirty seconds it is the apex of everything. It knows this feeling. It also knows it ends."
    }
  },

  mangrove_coast: {
    id: 'mangrove_coast',
    environment: 'Mangrove Coast',
    creature: 'Mudskipper',
    strings: {
      flourishing: [
        "{TICKER} up {CHANGE} this week. The tide is high but not too high. The mudskipper has more shoreline than it has ever used and keeps checking the water's edge anyway.",
        "Up {CHANGE}. The mangrove roots are fully submerged at peak and perfectly exposed at low. The mudskipper moves between them without effort. It has never had this much room and it doesn't fully trust it.",
        "{TICKER} up {CHANGE} this month. The mud is perfect — wet enough to breathe through, firm enough to climb. The mudskipper stops at the highest root it has ever reached and looks back at the water a long time."
      ],
      stable: [
        "The tide comes in and goes out on schedule. {CHANGE} this week. The mudskipper knows exactly where the waterline will be.",
        "{TICKER} at {PRICE}. The mud is the right consistency. The mudskipper does not think about the mud.",
        "{CHANGE} this month. The mangrove coast is as it should be. The mudskipper moves between water and land the way it always has."
      ],
      uneasy: [
        "The tide was late this morning by a small amount. {TICKER} {CHANGE}. The mudskipper waited at the waterline longer than usual.",
        "{CHANGE}. The mud is slightly drier than {DAYS} days ago. The mudskipper keeps its skin wet more deliberately now.",
        "{TICKER} {CHANGE}. The water pulled back a little further than expected. The mudskipper is fine. It just noticed."
      ],
      stressed: [
        "The tide isn't reaching the upper roots anymore. {TICKER} {CHANGE}. The mudskipper stays lower than it wants to.",
        "{CHANGE} this week. The mud is hardening at the edges. The mudskipper moistens its skin every few minutes. This is new behavior.",
        "{TICKER} {CHANGE}. The salinity is wrong. The mudskipper can feel it through its skin. It keeps moving, looking for the right patch of mud, not finding it."
      ],
      crisis: [
        "The tide hasn't come in {DAYS} days. {TICKER} {CHANGE}. The mudskipper is in the last wet mud at the base of the oldest root.",
        "{CHANGE} this month. The mangrove flats are baking. The mudskipper breathes in short intervals. The threshold it was built for has disappeared.",
        "{TICKER} down {CHANGE}. The mudskipper is neither in water nor on land. Both have failed it. It waits in the narrow place between them."
      ],
      inversion: "The tide rushes in all the way to the tree line. The mudskipper is completely submerged for the first time. It finds, briefly, that it can breathe. This is not supposed to be possible. It is."
    }
  },

  cloud_forest: {
    id: 'cloud_forest',
    environment: 'Cloud Forest',
    creature: 'Resplendent Quetzal',
    strings: {
      flourishing: [
        "{TICKER} up {CHANGE} this week. The laurel trees are heavy with fruit. The quetzal has eaten every day for {DAYS} days and its tail feathers are longer than they've ever been. It preens them carefully, as if it knows.",
        "Up {CHANGE}. The cloud forest is thick with mist. The quetzal moves through it like it owns the altitude. Something about the abundance makes it fly higher than it needs to.",
        "{TICKER} up {CHANGE} this month. The fruit is everywhere. The quetzal swallows it whole and returns to the same branch. Returns again. The branch is still full. This hasn't happened before."
      ],
      stable: [
        "The mist comes in at the usual hour. {CHANGE} this week. The quetzal finds the laurel trees without looking.",
        "{TICKER} at {PRICE}. The cloud forest holds its altitude. The quetzal is where it needs to be, eating what it needs to eat.",
        "{CHANGE} this month. The fruit is neither abundant nor scarce. The quetzal eats enough. Its tail feathers hold their length."
      ],
      uneasy: [
        "The mist burned off earlier than usual. {TICKER} {CHANGE}. The quetzal moved deeper into the canopy and stayed there.",
        "{CHANGE}. The laurel fruit is slightly less this week than last. {DAYS} trees that were fruiting aren't anymore. The quetzal has mapped this without trying to.",
        "{TICKER} {CHANGE}. The cloud ceiling is higher today. The quetzal can feel the altitude difference. It hasn't found the right branch yet."
      ],
      stressed: [
        "The mist is gone by midmorning now. {TICKER} {CHANGE}. The quetzal hunts longer for the same fruit it used to find immediately.",
        "{CHANGE} this week. The quetzal's tail feathers are shorter than {DAYS} weeks ago. The forest is reading on its body.",
        "{TICKER} {CHANGE}. The laurel trees are barely fruiting. The quetzal flies further each day. The altitude that protected it is no longer enough."
      ],
      crisis: [
        "The cloud forest has no clouds. {TICKER} {CHANGE}. The quetzal sits on a bare branch in direct sunlight, exposed in every color.",
        "{CHANGE} this month. The laurel fruit is gone. The quetzal hasn't eaten in {DAYS} days. Its tail feathers have shortened visibly.",
        "{TICKER} down {CHANGE}. The quetzal is the most beautiful thing in a dying forest. It has nowhere else to be."
      ],
      inversion: "The mist returns all at once, thicker than the quetzal has ever known. The laurel trees fruit overnight. The quetzal eats until it can't and its tail grows an inch in an hour. This is not the forest it was trained for. It is better. That is what frightens it."
    }
  },

  boreal_forest: {
    id: 'boreal_forest',
    environment: 'Boreal Forest',
    creature: 'Moose',
    strings: {
      flourishing: [
        "{TICKER} up {CHANGE} this week. The snow is deep but the moose moves through it without effort. There is browse on every branch. It eats standing still and the forest keeps offering.",
        "Up {CHANGE}. The boreal forest is at its fullest. The moose has covered less ground this week than any week before. Everything it needs is within reach. It doesn't know what to do with the stillness.",
        "{TICKER} up {CHANGE} this month. The lake is full of aquatic plants. The moose wades in to its shoulders and eats for an hour. Then wades in again. The abundance has no bottom and the moose keeps testing that."
      ],
      stable: [
        "The snow is manageable. {CHANGE} this week. The moose follows the same trail it made {DAYS} days ago.",
        "{TICKER} at {PRICE}. The boreal forest in its ordinary state. The moose eats what it needs and moves on.",
        "{CHANGE} this month. The browse is where it always is. The moose doesn't need to think about this."
      ],
      uneasy: [
        "The temperature dropped overnight unexpectedly. {TICKER} {CHANGE}. The moose shifted its range slightly, looking for something it can't name.",
        "{CHANGE}. The snow has a crust on it this morning. The moose tested it with one hoof and stood still a long time after.",
        "{TICKER} {CHANGE}. The willows the moose usually browses are thinner than {DAYS} weeks ago. Not gone. Just thinner."
      ],
      stressed: [
        "The ice crust is holding the moose's weight for three steps and breaking on the fourth. {TICKER} {CHANGE}. Every movement is a calculation.",
        "{CHANGE} this week. The moose is burning more than it's eating. It stands still more often now, conserving, waiting for a thaw that isn't coming.",
        "{TICKER} {CHANGE}. The browse is under ice. The moose can see it. It breaks through with its nose {DAYS} times before stopping."
      ],
      crisis: [
        "The entire forest is glazed. {TICKER} {CHANGE}. The moose stands in the open, too exhausted to break through to anything.",
        "{CHANGE} this month. The moose hasn't eaten properly in {DAYS} days. It is enormous and starving and the forest is full of food it cannot reach.",
        "{TICKER} down {CHANGE}. The moose stands at the edge of the frozen lake. Somewhere underneath, the aquatic plants are still there. The moose knows this and it doesn't help."
      ],
      inversion: "The ice breaks all at once. The moose steps through into deep powder, soft and giving, and the willows are suddenly bare of ice and heavy with new growth. It eats for a long time without lifting its head. When it finally looks up the forest is the same forest. Something has shifted that has no name."
    }
  },

  savanna_wetland: {
    id: 'savanna_wetland',
    environment: 'Savanna Wetland',
    creature: 'Hippopotamus',
    strings: {
      flourishing: [
        "{TICKER} up {CHANGE} this week. The wetland is flooded to its furthest edges. The hippo has space it has never used before and still chooses the same deep channel. Old habits in new water.",
        "Up {CHANGE}. The rains came early and the pools merged into one vast shallow lake. The hippo moves through it all day. Its skin is perfect. It still returns to the same spot at dusk for no reason it could explain.",
        "{TICKER} up {CHANGE} this month. The savanna is green from horizon to horizon. The hippo grazes at night in grass so tall it disappears. In the morning it returns to the water and finds it has risen again overnight."
      ],
      stable: [
        "The water level is where it should be for this season. {CHANGE} this week. The hippo submerges at dawn and surfaces at dusk.",
        "{TICKER} at {PRICE}. The pool is the right depth. The hippo does not think about the pool.",
        "{CHANGE} this month. The herd is spread across the wetland at comfortable distances. The hippo knows where each one is without looking."
      ],
      uneasy: [
        "The water dropped {CHANGE} in the last week. The hippo's back is exposed more than usual in the afternoon sun.",
        "{TICKER} {CHANGE}. The hippo shifted to the deeper end of the pool {DAYS} days ago. The others noticed. Nobody said anything.",
        "{CHANGE}. The grass at the water's edge is yellowing at the tips. The hippo grazes further out at night than it used to."
      ],
      stressed: [
        "The pool is half what it was. {TICKER} {CHANGE}. The herd is compressed and the hippo knows every inch of what's left.",
        "{CHANGE} this week. The hippo's shoulders are cracking at the waterline where it can't fully submerge. It keeps shifting its weight.",
        "{TICKER} {CHANGE}. There have been three confrontations at the water's edge in {DAYS} days. The hippo won them all. This is not a comfort."
      ],
      crisis: [
        "The wetland is mud and the mud is drying. {TICKER} {CHANGE}. The hippo stands in the last deep pool with twelve others, none of them moving.",
        "{CHANGE} this month. The hippo's skin is beginning to show. It produces more of the red secretion than usual, which means it is already damaged.",
        "{TICKER} down {CHANGE}. The pool is shallow enough to stand in. The hippo submerges as much of itself as it can and waits for rain that the sky is not promising."
      ],
      inversion: "The rains return without warning and the wetland floods in an hour. The hippo walks out into water that reaches its chin and keeps walking. The herd disperses across the sudden lake. For the first time in weeks, no one is touching anyone else. The hippo floats and forgets, briefly, that it was ever dry."
    }
  }
};
