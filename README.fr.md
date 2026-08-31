# Modèle de planificateur de voyage

<p align="center">
  <a href="README.md">English</a> ·
  <a href="README.ko.md">한국어</a> ·
  <a href="README.ja.md">日本語</a> ·
  <a href="README.zh-CN.md">简体中文</a> ·
  <a href="README.zh-TW.md">繁體中文</a> ·
  <a href="README.es.md">Español</a> ·
  <b>Français</b>
</p>

Une application web statique de planification de voyage à déployer sur GitHub Pages, sans outils de build.
**Servez-vous-en comme point de départ et façonnez votre propre modèle de planification avec l'IA.**

> Ce dépôt n'est qu'un **exemple**. Les données sont renseignées pour un voyage à Tokyo en septembre 2026,
> mais rien n'est figé. Utilisez-le tel quel s'il vous convient, ou retravaillez la destination, la structure,
> le design et les fonctionnalités à votre goût pour en faire un meilleur modèle. Nous ne sommes qu'un point de départ.

## Pourquoi ce projet

Il part d'un constat : **on planifie beaucoup avant un voyage, mais on ne réécrit pas le plan pendant.**
Un voyage ne se déroule jamais à 100 % comme prévu et les choses changent, mais on ne refait pas l'itinéraire en cours de route.
Cette application traite donc la planification en deux phases distinctes.

- **Avant le voyage — planifier** : construisez l'itinéraire avec l'IA et chargez ce dont vous aurez besoin
  (lieux, liens, candidats). Poussez sur GitHub et c'est en ligne ; partagez le lien avec vos compagnons de voyage.
- **Pendant le voyage — référence (lecture seule)** : ici, vous ne modifiez pas le plan. Il sert à
  **consulter ce que vous avez préparé et à décider vite sur place.**
  - Voyez l'itinéraire du jour d'un coup d'œil grâce aux onglets par date
  - Parcourez les lieux candidats par quartier avec une simple priorité (« incontournable / envie / si le temps le permet »), pas un horaire
  - Un appui pour l'itinéraire sur la carte (Naver pour les trajets en Corée, Google pour ceux au Japon)
  - Cochez les lieux déjà visités (enregistré localement sur votre appareil)

Le plan n'est pas imposé. Au lieu d'un horaire fixe, gardez un ordre souple et une liste courte,
et choisissez au fil de l'eau. C'est ça, voyager.

## Points clés

- Sans framework, sans bundler, sans backend. HTML/CSS/modules ES purs.
- Données et interface séparées — toutes les infos du voyage tiennent dans un seul `data/trip.js`.
- Mode clair uniquement, mobile-first (fonctionne aussi sur ordinateur).

---

## Démarrage

### 1. Cloner et lancer en local

```bash
git clone https://github.com/<your-name>/<your-repo>.git
cd <your-repo>
python3 -m http.server 8000
# http://localhost:8000
```

Ouvrir `index.html` directement dans le navigateur casse le chargement des modules ES : servez-le toujours
depuis un serveur local. (N'importe quel serveur statique convient : `npx serve`, etc., à la place de `python3`.)

### 2. Adaptez-le à votre voyage

Le plus rapide est de **confier ça à l'IA**. Ouvrez tout le dépôt et dites
« adapte ce projet pour mon voyage à ___ » : elle passera en revue `data/trip.js` et, au besoin,
la mise en page, la structure des onglets et les styles.

Les règles de travail de ce dépôt pour les assistants IA sont dans
[`CLAUDE.md`](CLAUDE.md) — Claude Code le lit automatiquement ; indiquez ce fichier aux autres outils.

### 3. Déployer (GitHub Pages)

1. Dépôt → **Settings → Pages**
2. **Source: Deploy from a branch**, Branch : `main` / `/(root)`
3. Quelques minutes plus tard, c'est en ligne sur `https://<your-name>.github.io/<your-repo>/`
4. Partagez ce lien avec vos compagnons. Ensuite, poussez simplement vos modifications et elles sont publiées automatiquement.

Le fichier `.nojekyll` saute le traitement Jekyll. Tous les chemins d'actifs sont relatifs, donc ça fonctionne pour un déploiement en sous-chemin.

## Précaution

> [!WARNING]
> **N'inscrivez pas d'informations sensibles directement.** `data/trip.js` est commité
> dans le dépôt et publié publiquement sur GitHub Pages, et l'historique git le conserve
> même après suppression. N'y mettez pas les numéros de réservation, de passeport ou de
> pièce d'identité, les numéros de téléphone, l'adresse complète du domicile ni les codes
> d'accès : partagez cela avec vos compagnons via un canal privé. Les noms de lieux, les
> quartiers et les coordonnées de carte ne posent pas de problème.
