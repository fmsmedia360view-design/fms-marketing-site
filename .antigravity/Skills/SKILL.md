
# Design- und Interaktions-Dokumentation: Ohzi Interactive

Dieses Dokument dient als Anleitung für einen Entwickler-Agenten, um die visuelle und interaktive Erfahrung der "Ohzi Interactive"-Webseite nachzubilden.

## Visual Identity

### Farben
- **Hintergrund:** Ein sehr dunkles Grau/Schwarz (z.B. `#101010`) mit einem leichten radialen Gradienten, der in der Mitte subtil heller ist, um Tiefe zu erzeugen.
- **Text:** Primär Weiß (`#FFFFFF` oder ein leichtes Off-White wie `#F0F0F0`) für maximale Lesbarkeit auf dem dunklen Hintergrund.
- **Akzentfarben (Leuchtkugeln):** Weiche, leuchtende Kugeln in Orange, Magenta/Lila und Weiß. Diese Lichter erzeugen einen "Glow"-Effekt (Bokeh-Effekt).
- **3D-Objekt (Würfel):** Ein zentrales Objekt in einem leuchtenden, texturierten Blau, das an Energie oder eine magische Aura erinnert.
- **Buttons & Ränder:** Der "EXPLORE"-Button hat einen dünnen, hellen Rand (Weiß oder ein sehr helles Blau).
- **Links:** Der "Privacy Policy"-Link im Footer ist unterstrichen und hebt sich farblich leicht vom umgebenden Text ab.

### Schriften
- **Primärschriftart:** Eine moderne, serifenlose Schriftart (z.B. Inter, Montserrat oder eine ähnliche geometrische Sans-Serif).
- **Logo & Hauptüberschrift ("DIVE INTO DIGITAL MAGIC"):** Wird in Großbuchstaben (Uppercase) gesetzt. Ein leicht erhöhter Zeichenabstand (`letter-spacing`) sorgt für einen cineastischen, weiten Look.
- **Sub-Überschrift & Fließtext:** Normale Groß-/Kleinschreibung mit einem dünneren Schriftschnitt (`font-weight: 300` oder `400`) für eine klare Hierarchie.

### Radien
- **Buttons:** Leicht abgerundete Ecken (z.B. `border-radius: 4px` oder `6px`), um eine moderne, aber nicht zu verspielte Ästhetik zu schaffen.
- **Leuchtkugeln:** Perfekte Kreise (`border-radius: 50%`).
- **Würfel:** Scharfe Kanten, um einen Kontrast zu den weichen Lichtkugeln zu bilden.

---

## Layout-Logik

Das gezeigte Layout ist kein "Bento-Grid", sondern ein klassischer "Above the Fold" Hero-Bereich, der die gesamte Bildschirmhöhe und -breite (`100vh`, `100vw`) einnimmt. Die Anordnung ist stark zentriert und minimalistisch.

- **Struktur:**
    - **Header:** Eine am oberen Bildschirmrand fixierte (`position: fixed`) Leiste.
        - **Links:** Logo (`OHZI INTERACTIVE`).
        - **Rechts:** Hamburger-Menü-Icon (zwei horizontale Linien).
    - **Hauptinhalt (Hero Section):** Vertikal und horizontal zentriert (`display: flex`, `justify-content: center`, `align-items: center`).
        - Die Elemente sind übereinander gestapelt, um Tiefe zu erzeugen (von hinten nach vorne):
            1.  Dunkler Hintergrund.
            2.  Leuchtkugeln und spiegelnde Wasseroberfläche (Teil der 3D-Szene).
            3.  3D-Würfel (das zentrale Element).
            4.  Text-Overlay (Überschrift, Sub-Überschrift).
            5.  "Explore"-Button.
    - **Footer:** Eine schmale Leiste am unteren Rand.
        - **Zentriert:** Cookie-Hinweis mit Link zur "Privacy Policy".
        - **Unten links:** Ein animiertes Chevron/Pfeil-Icon, das zum Scrollen animiert.

---

## Interaktions-Guide

Basierend auf der URL und modernen Web-Praktiken sind folgende Interaktionen zu implementieren:

- **Beim Laden der Seite:**
    -   Alle UI-Elemente (Logo, Menü, Text, Button) blenden sanft ein (`fade-in` Animation).
    -   Die 3D-Szene initialisiert; der Würfel könnte sich langsam drehen oder subtil pulsieren.

- **Hover-Effekte:**
    -   **"Explore"-Button:** Bei Hover leuchtet der Rand heller oder der Button füllt sich langsam mit einer Farbe. Ein subtiler "Glow"-Effekt ist passend.
    -   **Hamburger-Menü:** Die Linien könnten sich leicht animieren (z.B. näher zusammenrücken) oder ihre Deckkraft ändern.
    -   **Links ("Privacy Policy"):** Standard-Unterstreichung oder Farbwechsel bei Hover.

- **Scroll-Verhalten:**
    -   Beim Scrollen nach unten (angeteutet durch den Pfeil unten links) verlässt der Hero-Bereich das Sichtfeld.
    -   Die 3D-Szene reagiert auf den Scroll-Vorgang:
        -   Der Würfel zoomt heraus, dreht sich weg oder fliegt aus dem Bild.
        -   Ein Parallax-Effekt bewegt die Leuchtkugeln in unterschiedlichen Geschwindigkeiten, um mehr Tiefe zu suggerieren.
    -   Der nachfolgende Inhalt der Seite (Projekte, "Über uns" etc.) wird Sektion für Sektion mit "Scroll-Triggered Animations" (z.B. `fade-in-up`) eingeblendet.

---

## Spline-Integration

Das 3D-Objekt ist das Herzstück des Designs und wird wahrscheinlich mit einer Bibliothek wie Spline oder Three.js umgesetzt.

- **Positionierung:**
    -   Die 3D-Canvas muss den gesamten Hintergrund des Hero-Bereichs einnehmen (`position: absolute`, `top: 0`, `left: 0`, `width: 100%`, `height: 100%`).
    -   Sie muss mittels `z-index` hinter die UI-Elemente (Header, Texte, Button, Footer) gelegt werden. Eine typische `z-index`-Struktur wäre:
        -   `z-0` oder `z-[-1]`: 3D-Canvas (Spline).
        -   `z-10`: UI-Elemente (Text, Button etc.).
        -   `z-20` oder höher: Header (damit er immer über allem liegt).
- **Umsetzung:**
    -   Um den Effekt aus dem Bild zu erzielen, muss die 3D-Szene selbst die Leuchtkugeln, den Würfel und die spiegelnde Oberfläche (als "Boden") enthalten.
    -   Die Kamera in der 3D-Szene muss so positioniert sein, dass der Würfel zentral erscheint, leicht von oben betrachtet, um die Reflexion gut sichtbar zu machen.
    -   Die farbigen Kugeln müssen in der 3D-Umgebung als Lichtquellen konfiguriert werden, damit sie den Würfel korrekt beleuchten und realistische Reflexionen und Schatten werfen.
    -   Interaktivität wie Maus-Parallax (die Szene bewegt sich leicht mit dem Mauszeiger) wird direkt in Spline/Three.js konfiguriert, um die Szene lebendiger wirken zu lassen.
