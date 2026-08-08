// FinMate AI — UI strings for all supported languages + helpers.
// Language codes: en (default), af, fr, es, ar (RTL).

export const LANGUAGES = [
  { code: "en", label: "English", locale: "en-US", dir: "ltr" },
  { code: "af", label: "Afrikaans", locale: "af", dir: "ltr" },
  { code: "fr", label: "Français", locale: "fr", dir: "ltr" },
  { code: "es", label: "Español", locale: "es", dir: "ltr" },
  { code: "ar", label: "العربية", locale: "ar", dir: "rtl" },
];

export const CURRENCIES = ["ZAR", "USD", "EUR"];

export const translations = {
  en: {
    app: { name: "FinMate AI", tagline: "Your friendly money assistant" },
    nav: {
      home: "Home",
      dashboard: "Dashboard",
      reports: "Reports",
      settings: "Settings",
      profile: "Profile",
      upgrade: "Go Pro",
      proLabel: "Pro ✓",
      skipToContent: "Skip to content",
    },
    footer: {
      rights: "All rights reserved.",
      madeWith: "Made for people who want their money to behave.",
    },
    common: {
      comingSoon: "Coming soon",
      backToDashboard: "Back to Dashboard",
      cancel: "Cancel",
      close: "Close",
      saving: "Saving",
      loading: "Loading",
      delete: "Delete",
      notifications: "Notifications",
    },
    home: {
      heroBadge: "Your money, understood",
      heroTitle: "Take control of your money, one goal at a time",
      heroSubtitle:
        "FinMate AI tracks your savings, debt and investment goals, turns your numbers into weekly and monthly reports, and answers your money questions in plain language.",
      ctaDashboard: "Open Dashboard",
      ctaUpgrade: "Explore Pro",
      featuresTitle: "Everything you need to stay on track",
      features: [
        {
          title: "Goal tracking",
          body: "Savings, debt and investment goals with live progress bars and target dates.",
        },
        {
          title: "Smart reports",
          body: "Weekly and monthly income, expense and savings-rate reports with charts.",
        },
        {
          title: "AI assistant",
          body: "Ask questions like “How much did I save last month?” and get instant answers.",
        },
        {
          title: "Proactive alerts",
          body: "Get warned when your expenses trend above your income before it hurts.",
        },
        {
          title: "Your language",
          body: "English, Afrikaans, Français, Español and العربية — with full right-to-left support.",
        },
        {
          title: "Private by design",
          body: "All your data stays in your browser. No account, no tracking, no cloud.",
        },
      ],
      trustLine:
        "Free to start · No account needed · Your data stays on your device",
    },
    dashboard: {
      title: "Dashboard",
      subtitle: "Your money at a glance",
      alertTitle: "Expenses trending above income",
      alertBody:
        "Your expenses for {month} ({expenses}) are above your income ({income}). Try trimming non-essential spending this month.",
      promoTitle: "Go Pro — unlock the full picture",
      promoBody:
        "Unlimited goals, advanced analytics and CSV exports. One low monthly price.",
      promoCta: "See Pro features",
      dismiss: "Dismiss",
      goalsTitle: "Your goals",
      addGoal: "Add goal",
      addGoalTitle: "New goal",
      goalType: "Type",
      goalTitle: "Title",
      goalTarget: "Target amount",
      goalCurrent: "Current amount",
      goalDate: "Target date (optional)",
      goalMonthly: "Monthly contribution (optional)",
      goalSubmit: "Create goal",
      goalAdded: "Goal added",
      goalDeleted: "Goal deleted",
      contributionAdded: "Contribution added",
      typeSavings: "Savings",
      typeDebt: "Debt",
      typeInvestment: "Investment",
      progress: "Progress",
      of: "of",
      targetDate: "Target date",
      monthlyContribution: "Monthly contribution",
      contribute: "Add",
      contributeLabel: "Amount to add",
      deleteGoal: "Delete goal",
      reportTitle: "This month",
      reportIncome: "Income",
      reportExpenses: "Expenses",
      reportSavings: "Savings",
      reportRate: "Savings rate",
      viewFullReports: "View full reports",
      lastSixMonths: "Last 6 months",
      recommendationsTitle: "Smart recommendations",
      assistantTitle: "Ask FinMate",
      assistantPlaceholder: "Ask about your money…",
      assistantSend: "Send",
      assistantTyping: "FinMate is thinking…",
      assistantGreeting:
        "Hi! I'm FinMate. Ask me things like “How much did I save last month?” or “Generate a July expense report”.",
      noGoals: "No goals yet. Add your first goal to start tracking.",
    },
    settings: {
      title: "Settings",
      subtitle: "Personalize your FinMate experience",
      notifications: "Notifications",
      notificationsDesc:
        "Show proactive alerts when your expenses trend above your income.",
      currency: "Currency",
      currencyDesc: "How amounts are formatted across the app.",
      language: "Language",
      languageDesc:
        "Choose your language. Arabic switches the whole app to right-to-left.",
      theme: "Appearance",
      themeDesc: "Choose between light and dark mode.",
      light: "Light",
      dark: "Dark",
      saved: "Settings saved",
      resetData: "Reset demo data",
      resetDataDesc:
        "Restore the sample goals and history. Your own goals will be replaced.",
      resetConfirm:
        "This will replace your goals and history with the sample data. Continue?",
      dataReset: "Demo data restored",
    },
    reports: {
      title: "Reports",
      subtitle: "Weekly and monthly breakdowns with smart insights",
      tabWeekly: "Weekly",
      tabMonthly: "Monthly",
      weeklyDesc: "Average weekly income and expenses for {month}.",
      monthlyDesc: "Your last 6 months at a glance.",
      incomeVsExpenses: "Income vs expenses",
      categoryBreakdown: "Category breakdown",
      savingsTrend: "Savings trend",
      insightsTitle: "Smart insights",
      exportCsv: "Export CSV",
      exportDone: "CSV downloaded",
      exportProNote: "CSV export is a Pro feature",
      lockedTitle:
        "Weekly reports, category breakdowns and CSV export are Pro features",
      lockedBody:
        "Your Free plan includes the current-month summary. Upgrade to Pro for weekly and monthly reports, advanced insights and CSV exports.",
      lockedCta: "Upgrade to Pro",
      currentMonth: "Current month",
      noData: "No report data yet — open Settings and restore the demo data.",
    },
    upgrade: {
      title: "Go Pro",
      subtitle: "Compare plans and pick what fits",
      currentPlan: "Current plan",
      freeBadge: "Free",
      proBadge: "Pro",
      youArePro: "You're on Pro — thank you for supporting FinMate!",
      youAreProDesc:
        "Unlimited goals, weekly and monthly reports, advanced insights and CSV export are unlocked on this device.",
      priceFree: "R 0",
      pricePro: "R 79",
      perMonth: "/ month",
      feature: "Feature",
      rowGoals: "Goals",
      rowGoalsFree: "Up to 3",
      rowGoalsPro: "Unlimited",
      rowReports: "Reports",
      rowReportsFree: "Current month",
      rowReportsPro: "Weekly + monthly",
      rowInsights: "Smart insights",
      rowInsightsFree: "Basic",
      rowInsightsPro: "Advanced",
      rowExport: "CSV export",
      rowExportFree: "—",
      rowExportPro: "Included",
      rowAssistant: "AI assistant",
      rowAssistantFree: "Standard",
      rowAssistantPro: "Priority",
      payButton: "Pay {price} with PayFast",
      payfastTitle: "Secure checkout via PayFast",
      payfastSetupTitle: "Payments are being set up",
      payfastSetupBody:
        "The PayFast checkout appears here once the merchant credentials are configured. In the meantime you can try the Pro demo — no real payment is made.",
      demoUnlock: "Try Pro demo",
      demoUnlockDesc:
        "Demo mode: your plan is stored locally in this browser. No real payment.",
      demoUnlocked:
        "Pro demo unlocked — unlimited goals and full reports are now active!",
      securedBy: "Secured by PayFast (ZAR)",
      back: "Maybe later",
    },
    profile: {
      title: "Profile",
      subtitle: "Your details and financial health",
      name: "Name",
      email: "Email",
      save: "Save changes",
      saved: "Profile saved",
      plan: "Plan",
      upgrade: "Upgrade to Pro",
      managePlan: "Manage plan",
      healthTitle: "Financial health score",
      healthDesc:
        "Computed from your savings rate, debt progress and emergency coverage.",
      outOf100: "out of 100",
    },
    assistant: {
      savedLastMonth:
        "You saved {amount} last month ({month}): income {income}, expenses {expenses}.",
      savedThisMonth:
        "So far this month ({month}): income {income}, expenses {expenses} — that's {amount} saved.",
      expenseReport:
        "Here is the {month} expense report. Total expenses: {expenses}. Top category: {topCategory} ({topAmount}). Categories: {categories}.",
      noDataForMonth:
        "I don't have records for {month}. The most recent month I have is {latestMonth}.",
      balance: "Across your goals you currently have {amount} set aside.",
      summary:
        "Here's your {month} summary: income {income}, expenses {expenses}, savings {savings} ({rate} savings rate). Set aside across goals: {balance}.",
      goalsDetail: "Here's how your goals are doing:\n{lines}",
      noGoals:
        "You don't have any goals yet. Add your first goal from the Dashboard.",
      of: "of",
      recommend: "Here are my recommendations:\n{list}",
      hello:
        "Hi there! 👋 Ask me about your savings, expenses or goals — for example “How much did I save last month?”",
      help: "I can help you with:\n• “How much did I save last month?”\n• “Generate a {month} expense report”\n• “What's my balance?”\n• “What are my goals?”\n• “Any recommendations?”",
      suggestion1: "How much did I save last month?",
      suggestion2: "Generate a {month} expense report",
      suggestion3: "What's my balance?",
      suggestion4: "What are my goals?",
      suggestionsLabel: "Suggested questions",
      fallback:
        "I didn't quite get that. Try “How much did I save last month?” or “Generate a July expense report”.",
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    },
    insights: {
      title: "Smart insights",
      savingsRateUp: {
        title: "Savings rate up",
        body: "Your savings rate rose to {rate} this month, up from {prevRate} last month.",
      },
      savingsRateDown: {
        title: "Savings rate down",
        body: "Your savings rate slipped to {rate} — it was {prevRate} last month.",
      },
      savingsRateSteady: {
        title: "Savings rate steady",
        body: "Your savings rate held at {rate} this month.",
      },
      topCategory: {
        title: "Top spending category",
        body: "{category} was your biggest expense this month at {amount}.",
      },
      runway: {
        title: "Runway",
        body: "Your savings cover about {days} days of expenses.",
      },
      expensesRising: {
        title: "Spending on the rise",
        body: "Expenses climbed {pct} compared with last month.",
      },
      expensesFalling: {
        title: "Spending down",
        body: "Expenses fell {pct} compared with last month — nice work.",
      },
    },
    health: {
      savingsRate: "Savings rate",
      debtProgress: "Debt payoff",
      emergencyCoverage: "Emergency coverage",
      months: "≈ {months} months",
      excellent: "Excellent",
      good: "Good",
      fair: "Fair",
      needsWork: "Needs work",
    },
    plan: {
      goalLimit:
        "The Free plan includes up to {max} goals. Upgrade to Pro for unlimited goals.",
      moreGoals: "You have {count} more goals on Pro.",
      goalCount: "{count}/{max} goals",
    },
    csv: {
      goalsSection: "Goals",
      monthlySection: "Monthly summary",
      type: "Type",
      title: "Title",
      current: "Current",
      target: "Target",
      progress: "Progress %",
      targetDate: "Target date",
      monthlyContribution: "Monthly contribution",
      month: "Month",
      income: "Income",
      expenses: "Expenses",
      savings: "Savings",
      savingsRate: "Savings rate %",
    },
    checkout: {
      successTitle: "Payment successful",
      successBody:
        "Your FinMate Pro subscription is now active: unlimited goals, weekly and monthly reports, advanced insights and CSV exports are unlocked.",
      successNote: "Check your email for the PayFast receipt.",
      successCta: "Go to Dashboard",
      cancelTitle: "Payment cancelled",
      cancelBody:
        "No charge was made and your account is unchanged. You can upgrade whenever you're ready.",
      cancelCta: "Back to Upgrade",
      cancelAlt: "Go to Dashboard",
    },
    rec: {
      expensesAboveIncome: {
        title: "Expenses exceeded income",
        body: "Spending hit {expenses} against {income} income — {pct}% above last month. Review non-essential expenses.",
      },
      expensesRising: {
        title: "Expenses are rising",
        body: "Spending is up {pct}% this month compared to {prevMonth}.",
      },
      emergencyFund: {
        title: "Build your emergency fund",
        body: "Your savings cover about {months} months of expenses. Aim for at least 3 months.",
      },
      debtHalfway: {
        title: "Great progress on {title}",
        body: "You've paid off {pct}% of this debt. Keep the monthly contribution going.",
      },
      savingsRate: {
        title: "Boost your savings rate",
        body: "Your savings rate is {rate}%. Try to reach at least 10–15% of income.",
      },
      boostContribution: {
        title: "Reach {title} sooner",
        body: "Increasing your monthly contribution by 5% would help you hit your target faster.",
      },
    },
    seed: {
      emergencyFund: "Emergency fund",
      capeTownHoliday: "Holiday in Cape Town",
      carLoan: "Car loan",
      creditCard: "Credit card",
      retirementAnnuity: "Retirement annuity",
      etfPortfolio: "ETF portfolio",
    },
    cats: {
      housing: "Housing",
      transport: "Transport",
      food: "Food",
      utilities: "Utilities",
      entertainment: "Entertainment",
      other: "Other",
    },
  },

  af: {
    app: { name: "FinMate AI", tagline: "Jou vriendelike geld-assistent" },
    nav: {
      home: "Tuis",
      dashboard: "Dashboard",
      reports: "Verslae",
      settings: "Instellings",
      profile: "Profiel",
      upgrade: "Gaan Pro",
      proLabel: "Pro ✓",
      skipToContent: "Slaan na inhoud oor",
    },
    footer: {
      rights: "Alle regte voorbehou.",
      madeWith: "Gemaak vir mense wat wil hê hul geld moet gedra.",
    },
    common: {
      comingSoon: "Binnekort",
      backToDashboard: "Terug na Dashboard",
      cancel: "Kanselleer",
      close: "Maak toe",
      saving: "Stoor",
      loading: "Laai",
      delete: "Verwyder",
      notifications: "Kennisgewings",
    },
    home: {
      heroBadge: "Jou geld, verstaan",
      heroTitle: "Neem beheer oor jou geld, een doel op 'n slag",
      heroSubtitle:
        "FinMate AI hou jou spaar-, skuld- en beleggingsdoelwitte dop, maak weeklikse en maandelikse verslae van jou syfers, en beantwoord jou geldvrae in gewone taal.",
      ctaDashboard: "Maak Dashboard oop",
      ctaUpgrade: "Verken Pro",
      featuresTitle: "Alles wat jy nodig het om op koers te bly",
      features: [
        {
          title: "Doelwit dop",
          body: "Spaar-, skuld- en beleggingsdoelwitte met lewendige vorderingsstawe en teikendatums.",
        },
        {
          title: "Slim verslae",
          body: "Weeklikse en maandelikse inkomste-, uitgawe- en spaarkoersverslae met grafieke.",
        },
        {
          title: "AI-assistent",
          body: "Vra vrae soos “Hoeveel het ek verlede maand gespaar?” en kry dadelik antwoorde.",
        },
        {
          title: "Proaktiewe waarskuwings",
          body: "Kry 'n waarskuwing wanneer jou uitgawes bo jou inkomste neig voordat dit seermaak.",
        },
        {
          title: "Jou taal",
          body: "Engels, Afrikaans, Français, Español en العربية — met volle regs-na-links-ondersteuning.",
        },
        {
          title: "Privaat ontwerp",
          body: "Al jou data bly in jou blaaier. Geen rekening, geen dop, geen wolk nie.",
        },
      ],
      trustLine:
        "Gratis om te begin · Geen rekening nodig nie · Jou data bly op jou toestel",
    },
    dashboard: {
      title: "Dashboard",
      subtitle: "Jou geld op 'n oogopslag",
      alertTitle: "Uitgawes neig bo inkomste",
      alertBody:
        "Jou uitgawes vir {month} ({expenses}) is bo jou inkomste ({income}). Probeer om nie-noodsaaklike besteding hierdie maand te snoei.",
      promoTitle: "Gaan Pro — ontsluit die volle prentjie",
      promoBody:
        "Onbeperkte doelwitte, gevorderde ontleding en CSV-uitvoere. Een lae maandelikse prys.",
      promoCta: "Sien Pro-kenmerke",
      dismiss: "Maak weg",
      goalsTitle: "Jou doelwitte",
      addGoal: "Voeg doelwit by",
      addGoalTitle: "Nuwe doelwit",
      goalType: "Tipe",
      goalTitle: "Titel",
      goalTarget: "Teikenbedrag",
      goalCurrent: "Huidige bedrag",
      goalDate: "Teikendatum (opsioneel)",
      goalMonthly: "Maandelikse bydrae (opsioneel)",
      goalSubmit: "Skep doelwit",
      goalAdded: "Doelwit bygevoeg",
      goalDeleted: "Doelwit verwyder",
      contributionAdded: "Bydrae bygevoeg",
      typeSavings: "Spaar",
      typeDebt: "Skuld",
      typeInvestment: "Belegging",
      progress: "Vordering",
      of: "van",
      targetDate: "Teikendatum",
      monthlyContribution: "Maandelikse bydrae",
      contribute: "Voeg by",
      contributeLabel: "Bedrag om by te voeg",
      deleteGoal: "Verwyder doelwit",
      reportTitle: "Hierdie maand",
      reportIncome: "Inkomste",
      reportExpenses: "Uitgawes",
      reportSavings: "Spaargeld",
      reportRate: "Spaarkoers",
      viewFullReports: "Bekyk volle verslae",
      lastSixMonths: "Laaste 6 maande",
      recommendationsTitle: "Slim aanbevelings",
      assistantTitle: "Vra FinMate",
      assistantPlaceholder: "Vra oor jou geld…",
      assistantSend: "Stuur",
      assistantTyping: "FinMate dink…",
      assistantGreeting:
        "Hallo! Ek is FinMate. Vra my dinge soos “Hoeveel het ek verlede maand gespaar?” of “Genereer 'n Julie-uitgawesverslag”.",
      noGoals:
        "Nog geen doelwitte nie. Voeg jou eerste doelwit by om te begin dop.",
    },
    settings: {
      title: "Instellings",
      subtitle: "Verpersoonlik jou FinMate-ervaring",
      notifications: "Kennisgewings",
      notificationsDesc:
        "Wys proaktiewe waarskuwings wanneer jou uitgawes bo jou inkomste neig.",
      currency: "Geldeenheid",
      currencyDesc: "Hoe bedrae regoor die app geformateer word.",
      language: "Taal",
      languageDesc:
        "Kies jou taal. Arabies skakel die hele app na regs-na-links.",
      theme: "Voorkoms",
      themeDesc: "Kies tussen ligte en donker modus.",
      light: "Lig",
      dark: "Donker",
      saved: "Instellings gestoor",
      resetData: "Stel demodata terug",
      resetDataDesc:
        "Herstel die voorbeelddoelwitte en -geskiedenis. Jou eie doelwitte sal vervang word.",
      resetConfirm:
        "Dit sal jou doelwitte en geskiedenis met die voorbeelddata vervang. Gaan voort?",
      dataReset: "Demodata herstel",
    },
    reports: {
      title: "Verslae",
      subtitle: "Weeklikse en maandelikse uiteensettings met slim insigte",
      tabWeekly: "Weekliks",
      tabMonthly: "Maandeliks",
      weeklyDesc: "Gemiddelde weeklikse inkomste en uitgawes vir {month}.",
      monthlyDesc: "Jou laaste 6 maande met een oogopslag.",
      incomeVsExpenses: "Inkomste teenoor uitgawes",
      categoryBreakdown: "Kategorie-uiteensetting",
      savingsTrend: "Spaartendens",
      insightsTitle: "Slim insigte",
      exportCsv: "Voer CSV uit",
      exportDone: "CSV afgelaai",
      exportProNote: "CSV-uitvoer is 'n Pro-kenmerk",
      lockedTitle:
        "Weeklikse verslae, kategorie-uiteensettings en CSV-uitvoer is Pro-kenmerke",
      lockedBody:
        "Jou Gratis-plan sluit die huidige-maand-samevatting in. Gradeer op na Pro vir weeklikse en maandelikse verslae, gevorderde insigte en CSV-uitvoere.",
      lockedCta: "Gaan Pro toe",
      currentMonth: "Huidige maand",
      noData:
        "Nog geen verslagdata nie — maak Instellings oop en herstel die demodata.",
    },
    upgrade: {
      title: "Gaan Pro",
      subtitle: "Vergelyk planne en kies wat pas",
      currentPlan: "Huidige plan",
      freeBadge: "Gratis",
      proBadge: "Pro",
      youArePro: "Jy is op Pro — dankie dat jy FinMate ondersteun!",
      youAreProDesc:
        "Onbeperkte doelwitte, weeklikse en maandelikse verslae, gevorderde insigte en CSV-uitvoer is op hierdie toestel ontsluit.",
      priceFree: "R 0",
      pricePro: "R 79",
      perMonth: "/ maand",
      feature: "Kenmerk",
      rowGoals: "Doelwitte",
      rowGoalsFree: "Tot 3",
      rowGoalsPro: "Onbeperk",
      rowReports: "Verslae",
      rowReportsFree: "Huidige maand",
      rowReportsPro: "Weekliks + maandeliks",
      rowInsights: "Slim insigte",
      rowInsightsFree: "Basies",
      rowInsightsPro: "Gevorderd",
      rowExport: "CSV-uitvoer",
      rowExportFree: "—",
      rowExportPro: "Ingesluit",
      rowAssistant: "AI-assistent",
      rowAssistantFree: "Standaard",
      rowAssistantPro: "Prioriteit",
      payButton: "Betaal {price} met PayFast",
      payfastTitle: "Veilige betaalkas via PayFast",
      payfastSetupTitle: "Betalings word opgestel",
      payfastSetupBody:
        "Die PayFast-betaalkas verskyn hier sodra die handelaar-bewyse gekonfigureer is. Intussen kan jy die Pro-demo probeer — geen werklike betaling nie.",
      demoUnlock: "Probeer Pro-demo",
      demoUnlockDesc:
        "Demo-modus: jou plan word plaaslik in hierdie blaaier gestoor. Geen werklike betaling nie.",
      demoUnlocked:
        "Pro-demo ontsluit — onbeperkte doelwitte en volle verslae is nou aktief!",
      securedBy: "Beveilig deur PayFast (ZAR)",
      back: "Miskien later",
    },
    profile: {
      title: "Profiel",
      subtitle: "Jou besonderhede en finansiële gesondheid",
      name: "Naam",
      email: "E-pos",
      save: "Stoor veranderinge",
      saved: "Profiel gestoor",
      plan: "Plan",
      upgrade: "Gaan Pro toe",
      managePlan: "Bestuur plan",
      healthTitle: "Finansiële gesondheidtelling",
      healthDesc:
        "Bereken uit jou spaarkoers, skuldvordering en noodfondsdekking.",
      outOf100: "uit 100",
    },
    assistant: {
      savedLastMonth:
        "Jy het verlede maand ({month}) {amount} gespaar: inkomste {income}, uitgawes {expenses}.",
      savedThisMonth:
        "Tot dusver hierdie maand ({month}): inkomste {income}, uitgawes {expenses} — dit is {amount} gespaar.",
      expenseReport:
        "Hier is die {month}-uitgawesverslag. Totale uitgawes: {expenses}. Grootste kategorie: {topCategory} ({topAmount}). Kategorieë: {categories}.",
      noDataForMonth:
        "Ek het nie rekords vir {month} nie. Die mees onlangse maand wat ek het is {latestMonth}.",
      balance: "Oor jou doelwitte het jy tans {amount} opsy gesit.",
      summary:
        "Hier is jou {month}-opsomming: inkomste {income}, uitgawes {expenses}, spaargeld {savings} ({rate} spaarkoers). Opsy gesit oor doelwitte: {balance}.",
      goalsDetail: "Hier is hoe jou doelwitte vaar:\n{lines}",
      noGoals:
        "Jy het nog geen doelwitte nie. Voeg jou eerste doelwit by vanaf die Dashboard.",
      of: "van",
      recommend: "Hier is my aanbevelings:\n{list}",
      hello:
        "Hallo daar! 👋 Vra my oor jou spaargeld, uitgawes of doelwitte — byvoorbeeld “Hoeveel het ek verlede maand gespaar?”",
      help: "Ek kan jou help met:\n• “Hoeveel het ek verlede maand gespaar?”\n• “Genereer 'n {month}-uitgawesverslag”\n• “Wat is my balans?”\n• “Wat is my doelwitte?”\n• “Enige aanbevelings?”",
      suggestion1: "Hoeveel het ek verlede maand gespaar?",
      suggestion2: "Genereer 'n {month}-uitgawesverslag",
      suggestion3: "Wat is my balans?",
      suggestion4: "Wat is my doelwitte?",
      suggestionsLabel: "Voorgestelde vrae",
      fallback:
        "Ek het dit nie mooi verstaan nie. Probeer “Hoeveel het ek verlede maand gespaar?” of “Genereer 'n Julie-uitgawesverslag”.",
      months: [
        "Januarie",
        "Februarie",
        "Maart",
        "April",
        "Mei",
        "Junie",
        "Julie",
        "Augustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ],
    },
    insights: {
      title: "Slim insigte",
      savingsRateUp: {
        title: "Spaarkoers op",
        body: "Jou spaarkoers het gestyg na {rate} hierdie maand, van {prevRate} verlede maand.",
      },
      savingsRateDown: {
        title: "Spaarkoers af",
        body: "Jou spaarkoers het gedaal na {rate} — dit was {prevRate} verlede maand.",
      },
      savingsRateSteady: {
        title: "Spaarkoers bestendig",
        body: "Jou spaarkoers het op {rate} gebly hierdie maand.",
      },
      topCategory: {
        title: "Grootste bestedingskategorie",
        body: "{category} was hierdie maand jou grootste uitgawe teen {amount}.",
      },
      runway: {
        title: "Aanloopbaan",
        body: "Jou spaargeld dek ongeveer {days} dae se uitgawes.",
      },
      expensesRising: {
        title: "Besteding styg",
        body: "Uitgawes het met {pct} gestyg vergeleke met verlede maand.",
      },
      expensesFalling: {
        title: "Besteding daal",
        body: "Uitgawes het met {pct} gedaal vergeleke met verlede maand — mooi so.",
      },
    },
    health: {
      savingsRate: "Spaarkoers",
      debtProgress: "Skuldafbetaling",
      emergencyCoverage: "Noodfondsdekking",
      months: "≈ {months} maande",
      excellent: "Uitstekend",
      good: "Goed",
      fair: "Redelik",
      needsWork: "Benodig aandag",
    },
    plan: {
      goalLimit:
        "Die Gratis-plan sluit tot {max} doelwitte in. Gaan Pro toe vir onbeperkte doelwitte.",
      moreGoals: "Jy het {count} meer doelwitte op Pro.",
      goalCount: "{count}/{max} doelwitte",
    },
    csv: {
      goalsSection: "Doelwitte",
      monthlySection: "Maandelikse samevatting",
      type: "Tipe",
      title: "Titel",
      current: "Huidig",
      target: "Teiken",
      progress: "Vordering %",
      targetDate: "Teikendatum",
      monthlyContribution: "Maandelikse bydrae",
      month: "Maand",
      income: "Inkomste",
      expenses: "Uitgawes",
      savings: "Spaargeld",
      savingsRate: "Spaarkoers %",
    },
    checkout: {
      successTitle: "Betaling suksesvol",
      successBody:
        "Jou FinMate Pro-intekening is nou aktief: onbeperkte doelwitte, weeklikse en maandelikse verslae, gevorderde insigte en CSV-uitvoere is ontsluit.",
      successNote: "Kyk na jou e-pos vir die PayFast-kwitansie.",
      successCta: "Gaan na Dashboard",
      cancelTitle: "Betaling gekanselleer",
      cancelBody:
        "Geen bedrag is gehef nie en jou rekening is onveranderd. Jy kan enige tyd opgradeer.",
      cancelCta: "Terug na Upgrade",
      cancelAlt: "Gaan na Dashboard",
    },
    rec: {
      expensesAboveIncome: {
        title: "Uitgawes het inkomste oorskry",
        body: "Besteding het {expenses} teen {income} inkomste getref — {pct}% bo verlede maand. Hersien nie-noodsaaklike uitgawes.",
      },
      expensesRising: {
        title: "Uitgawes styg",
        body: "Besteding is {pct}% hoër hierdie maand vergeleke met {prevMonth}.",
      },
      emergencyFund: {
        title: "Bou jou noodfonds",
        body: "Jou spaargeld dek ongeveer {months} maande se uitgawes. Mik vir minstens 3 maande.",
      },
      debtHalfway: {
        title: "Mooi vordering met {title}",
        body: "Jy het {pct}% van hierdie skuld afbetaal. Hou die maandelikse bydrae aan.",
      },
      savingsRate: {
        title: "Bou jou spaarkoers op",
        body: "Jou spaarkoers is {rate}%. Probeer om minstens 10–15% van inkomste te bereik.",
      },
      boostContribution: {
        title: "Bereik {title} vinniger",
        body: "Om jou maandelikse bydrae met 5% te verhoog sal jou help om jou teiken vinniger te haal.",
      },
    },
    seed: {
      emergencyFund: "Noodfonds",
      capeTownHoliday: "Vakansie in Kaapstad",
      carLoan: "Motorlening",
      creditCard: "Kredietkaart",
      retirementAnnuity: "Pensioenannuïteit",
      etfPortfolio: "ETF-portefeulje",
    },
    cats: {
      housing: "Behuising",
      transport: "Vervoer",
      food: "Kos",
      utilities: "Nutsdienste",
      entertainment: "Vermaak",
      other: "Ander",
    },
  },

  fr: {
    app: { name: "FinMate AI", tagline: "Votre assistant financier sympa" },
    nav: {
      home: "Accueil",
      dashboard: "Tableau de bord",
      reports: "Rapports",
      settings: "Paramètres",
      profile: "Profil",
      upgrade: "Passer Pro",
      proLabel: "Pro ✓",
      skipToContent: "Aller au contenu",
    },
    footer: {
      rights: "Tous droits réservés.",
      madeWith:
        "Créé pour les personnes qui veulent que leur argent se comporte bien.",
    },
    common: {
      comingSoon: "Bientôt disponible",
      backToDashboard: "Retour au tableau de bord",
      cancel: "Annuler",
      close: "Fermer",
      saving: "Enregistrement",
      loading: "Chargement",
      delete: "Supprimer",
      notifications: "Notifications",
    },
    home: {
      heroBadge: "Votre argent, compris",
      heroTitle: "Reprenez le contrôle de votre argent, objectif par objectif",
      heroSubtitle:
        "FinMate AI suit vos objectifs d'épargne, de dettes et d'investissement, transforme vos chiffres en rapports hebdomadaires et mensuels, et répond à vos questions d'argent en langage simple.",
      ctaDashboard: "Ouvrir le tableau de bord",
      ctaUpgrade: "Découvrir Pro",
      featuresTitle: "Tout ce qu'il faut pour rester sur la bonne voie",
      features: [
        {
          title: "Suivi d'objectifs",
          body: "Objectifs d'épargne, de dettes et d'investissement avec barres de progression et échéances.",
        },
        {
          title: "Rapports intelligents",
          body: "Rapports hebdomadaires et mensuels de revenus, dépenses et taux d'épargne avec graphiques.",
        },
        {
          title: "Assistant IA",
          body: "Posez des questions comme « Combien ai-je épargné le mois dernier ? » et obtenez des réponses instantanées.",
        },
        {
          title: "Alertes proactives",
          body: "Soyez averti quand vos dépenses dépassent vos revenus avant que ça ne fasse mal.",
        },
        {
          title: "Votre langue",
          body: "Anglais, Afrikaans, Français, Español et العربية — avec prise en charge complète de la droite à gauche.",
        },
        {
          title: "Conçu privé",
          body: "Toutes vos données restent dans votre navigateur. Pas de compte, pas de suivi, pas de cloud.",
        },
      ],
      trustLine:
        "Gratuit pour commencer · Aucun compte requis · Vos données restent sur votre appareil",
    },
    dashboard: {
      title: "Tableau de bord",
      subtitle: "Votre argent en un coup d'œil",
      alertTitle: "Dépenses supérieures aux revenus",
      alertBody:
        "Vos dépenses de {month} ({expenses}) dépassent vos revenus ({income}). Essayez de réduire les dépenses non essentielles ce mois-ci.",
      promoTitle: "Passez Pro — débloquez la vue complète",
      promoBody:
        "Objectifs illimités, analyses avancées et exportations CSV. Un prix mensuel imbattable.",
      promoCta: "Voir les fonctions Pro",
      dismiss: "Ignorer",
      goalsTitle: "Vos objectifs",
      addGoal: "Ajouter un objectif",
      addGoalTitle: "Nouvel objectif",
      goalType: "Type",
      goalTitle: "Titre",
      goalTarget: "Montant cible",
      goalCurrent: "Montant actuel",
      goalDate: "Échéance (optionnelle)",
      goalMonthly: "Contribution mensuelle (optionnelle)",
      goalSubmit: "Créer l'objectif",
      goalAdded: "Objectif ajouté",
      goalDeleted: "Objectif supprimé",
      contributionAdded: "Contribution ajoutée",
      typeSavings: "Épargne",
      typeDebt: "Dette",
      typeInvestment: "Investissement",
      progress: "Progression",
      of: "sur",
      targetDate: "Échéance",
      monthlyContribution: "Contribution mensuelle",
      contribute: "Ajouter",
      contributeLabel: "Montant à ajouter",
      deleteGoal: "Supprimer l'objectif",
      reportTitle: "Ce mois-ci",
      reportIncome: "Revenus",
      reportExpenses: "Dépenses",
      reportSavings: "Épargne",
      reportRate: "Taux d'épargne",
      viewFullReports: "Voir les rapports complets",
      lastSixMonths: "6 derniers mois",
      recommendationsTitle: "Recommandations intelligentes",
      assistantTitle: "Demandez à FinMate",
      assistantPlaceholder: "Posez une question sur votre argent…",
      assistantSend: "Envoyer",
      assistantTyping: "FinMate réfléchit…",
      assistantGreeting:
        "Salut ! Je suis FinMate. Demandez-moi par exemple « Combien ai-je épargné le mois dernier ? » ou « Générez un rapport des dépenses de juillet ».",
      noGoals:
        "Aucun objectif pour l'instant. Ajoutez votre premier objectif pour commencer.",
    },
    settings: {
      title: "Paramètres",
      subtitle: "Personnalisez votre expérience FinMate",
      notifications: "Notifications",
      notificationsDesc:
        "Afficher des alertes proactives quand vos dépenses dépassent vos revenus.",
      currency: "Devise",
      currencyDesc: "Comment les montants sont formatés dans l'application.",
      language: "Langue",
      languageDesc:
        "Choisissez votre langue. L'arabe bascule toute l'application en droite-à-gauche.",
      theme: "Apparence",
      themeDesc: "Choisissez entre le mode clair et le mode sombre.",
      light: "Clair",
      dark: "Sombre",
      saved: "Paramètres enregistrés",
      resetData: "Réinitialiser les données de démo",
      resetDataDesc:
        "Restaure les objectifs et l'historique d'exemple. Vos propres objectifs seront remplacés.",
      resetConfirm:
        "Cela remplacera vos objectifs et votre historique par les données d'exemple. Continuer ?",
      dataReset: "Données de démo restaurées",
    },
    reports: {
      title: "Rapports",
      subtitle:
        "Analyses hebdomadaires et mensuelles avec des informations intelligentes",
      tabWeekly: "Hebdomadaire",
      tabMonthly: "Mensuel",
      weeklyDesc: "Revenus et dépenses hebdomadaires moyens pour {month}.",
      monthlyDesc: "Vos 6 derniers mois en un coup d'œil.",
      incomeVsExpenses: "Revenus vs dépenses",
      categoryBreakdown: "Répartition par catégorie",
      savingsTrend: "Tendance de l'épargne",
      insightsTitle: "Informations intelligentes",
      exportCsv: "Exporter en CSV",
      exportDone: "CSV téléchargé",
      exportProNote: "L'export CSV est une fonction Pro",
      lockedTitle:
        "Les rapports hebdomadaires, les répartitions par catégorie et l'export CSV sont des fonctions Pro",
      lockedBody:
        "Votre plan Gratuit inclut le résumé du mois en cours. Passez à Pro pour les rapports hebdomadaires et mensuels, les analyses avancées et les exports CSV.",
      lockedCta: "Passer à Pro",
      currentMonth: "Mois en cours",
      noData:
        "Aucune donnée de rapport pour l'instant — ouvrez Paramètres et restaurez les données de démo.",
    },
    upgrade: {
      title: "Passer Pro",
      subtitle: "Comparez les formules et choisissez",
      currentPlan: "Formule actuelle",
      freeBadge: "Gratuit",
      proBadge: "Pro",
      youArePro: "Vous êtes Pro — merci de soutenir FinMate !",
      youAreProDesc:
        "Objectifs illimités, rapports hebdomadaires et mensuels, analyses avancées et export CSV sont débloqués sur cet appareil.",
      priceFree: "R 0",
      pricePro: "R 79",
      perMonth: "/ mois",
      feature: "Fonction",
      rowGoals: "Objectifs",
      rowGoalsFree: "Jusqu'à 3",
      rowGoalsPro: "Illimités",
      rowReports: "Rapports",
      rowReportsFree: "Mois en cours",
      rowReportsPro: "Hebdomadaire + mensuel",
      rowInsights: "Informations intelligentes",
      rowInsightsFree: "Basiques",
      rowInsightsPro: "Avancées",
      rowExport: "Export CSV",
      rowExportFree: "—",
      rowExportPro: "Inclus",
      rowAssistant: "Assistant IA",
      rowAssistantFree: "Standard",
      rowAssistantPro: "Prioritaire",
      payButton: "Payer {price} avec PayFast",
      payfastTitle: "Paiement sécurisé via PayFast",
      payfastSetupTitle: "Les paiements sont en cours de configuration",
      payfastSetupBody:
        "Le paiement PayFast apparaîtra ici dès que les identifiants marchand seront configurés. En attendant, essayez la démo Pro — aucun paiement réel.",
      demoUnlock: "Essayer la démo Pro",
      demoUnlockDesc:
        "Mode démo : votre formule est stockée localement dans ce navigateur. Aucun paiement réel.",
      demoUnlocked:
        "Démo Pro débloquée — objectifs illimités et rapports complets sont maintenant actifs !",
      securedBy: "Sécurisé par PayFast (ZAR)",
      back: "Peut-être plus tard",
    },
    profile: {
      title: "Profil",
      subtitle: "Vos informations et votre santé financière",
      name: "Nom",
      email: "E-mail",
      save: "Enregistrer",
      saved: "Profil enregistré",
      plan: "Formule",
      upgrade: "Passer à Pro",
      managePlan: "Gérer la formule",
      healthTitle: "Score de santé financière",
      healthDesc:
        "Calculé à partir de votre taux d'épargne, du remboursement de vos dettes et de votre fonds d'urgence.",
      outOf100: "sur 100",
    },
    assistant: {
      savedLastMonth:
        "Vous avez épargné {amount} le mois dernier ({month}) : revenus {income}, dépenses {expenses}.",
      savedThisMonth:
        "Jusqu'ici ce mois-ci ({month}) : revenus {income}, dépenses {expenses} — soit {amount} d'épargne.",
      expenseReport:
        "Voici le rapport des dépenses de {month}. Dépenses totales : {expenses}. Première catégorie : {topCategory} ({topAmount}). Catégories : {categories}.",
      noDataForMonth:
        "Je n'ai pas de données pour {month}. Le mois le plus récent dont je dispose est {latestMonth}.",
      balance:
        "Sur l'ensemble de vos objectifs, vous avez actuellement {amount} de côté.",
      summary:
        "Voici votre résumé de {month} : revenus {income}, dépenses {expenses}, épargne {savings} (taux d'épargne {rate}). Mis de côté sur vos objectifs : {balance}.",
      goalsDetail: "Voici où en sont vos objectifs :\n{lines}",
      noGoals:
        "Vous n'avez pas encore d'objectif. Ajoutez votre premier objectif depuis le tableau de bord.",
      of: "sur",
      recommend: "Voici mes recommandations :\n{list}",
      hello:
        "Bonjour ! 👋 Interrogez-moi sur votre épargne, vos dépenses ou vos objectifs — par exemple « Combien ai-je épargné le mois dernier ? »",
      help: "Je peux vous aider avec :\n• « Combien ai-je épargné le mois dernier ? »\n• « Générez un rapport des dépenses de {month} »\n• « Quel est mon solde ? »\n• « Quels sont mes objectifs ? »\n• « Des recommandations ? »",
      suggestion1: "Combien ai-je épargné le mois dernier ?",
      suggestion2: "Générez un rapport des dépenses de {month}",
      suggestion3: "Quel est mon solde ?",
      suggestion4: "Quels sont mes objectifs ?",
      suggestionsLabel: "Questions suggérées",
      fallback:
        "Je n'ai pas bien compris. Essayez « Combien ai-je épargné le mois dernier ? » ou « Générez un rapport des dépenses de juillet ».",
      months: [
        "janvier",
        "février",
        "mars",
        "avril",
        "mai",
        "juin",
        "juillet",
        "août",
        "septembre",
        "octobre",
        "novembre",
        "décembre",
      ],
    },
    insights: {
      title: "Informations intelligentes",
      savingsRateUp: {
        title: "Taux d'épargne en hausse",
        body: "Votre taux d'épargne est passé à {rate} ce mois-ci, contre {prevRate} le mois dernier.",
      },
      savingsRateDown: {
        title: "Taux d'épargne en baisse",
        body: "Votre taux d'épargne est retombé à {rate} — il était de {prevRate} le mois dernier.",
      },
      savingsRateSteady: {
        title: "Taux d'épargne stable",
        body: "Votre taux d'épargne s'est maintenu à {rate} ce mois-ci.",
      },
      topCategory: {
        title: "Catégorie de dépenses principale",
        body: "{category} a été votre plus grosse dépense ce mois-ci, à {amount}.",
      },
      runway: {
        title: "Réserve",
        body: "Votre épargne couvre environ {days} jours de dépenses.",
      },
      expensesRising: {
        title: "Dépenses en hausse",
        body: "Les dépenses ont augmenté de {pct} par rapport au mois dernier.",
      },
      expensesFalling: {
        title: "Dépenses en baisse",
        body: "Les dépenses ont baissé de {pct} par rapport au mois dernier — bravo.",
      },
    },
    health: {
      savingsRate: "Taux d'épargne",
      debtProgress: "Remboursement des dettes",
      emergencyCoverage: "Fonds d'urgence",
      months: "≈ {months} mois",
      excellent: "Excellent",
      good: "Bon",
      fair: "Moyen",
      needsWork: "À améliorer",
    },
    plan: {
      goalLimit:
        "La formule Gratuite inclut jusqu'à {max} objectifs. Passez à Pro pour des objectifs illimités.",
      moreGoals: "Vous avez {count} autres objectifs sur Pro.",
      goalCount: "{count}/{max} objectifs",
    },
    csv: {
      goalsSection: "Objectifs",
      monthlySection: "Résumé mensuel",
      type: "Type",
      title: "Titre",
      current: "Actuel",
      target: "Cible",
      progress: "Progression %",
      targetDate: "Échéance",
      monthlyContribution: "Contribution mensuelle",
      month: "Mois",
      income: "Revenus",
      expenses: "Dépenses",
      savings: "Épargne",
      savingsRate: "Taux d'épargne %",
    },
    checkout: {
      successTitle: "Paiement réussi",
      successBody:
        "Votre abonnement FinMate Pro est maintenant actif : objectifs illimités, rapports hebdomadaires et mensuels, analyses avancées et exports CSV sont débloqués.",
      successNote: "Consultez votre e-mail pour le reçu PayFast.",
      successCta: "Aller au tableau de bord",
      cancelTitle: "Paiement annulé",
      cancelBody:
        "Aucun débit n'a été effectué et votre compte est inchangé. Vous pouvez passer à Pro quand vous voulez.",
      cancelCta: "Retour à l'abonnement",
      cancelAlt: "Aller au tableau de bord",
    },
    rec: {
      expensesAboveIncome: {
        title: "Les dépenses ont dépassé les revenus",
        body: "Les dépenses ont atteint {expenses} contre {income} de revenus — {pct}% de plus que le mois dernier. Revoir les dépenses non essentielles.",
      },
      expensesRising: {
        title: "Les dépenses augmentent",
        body: "Les dépenses sont en hausse de {pct}% ce mois-ci par rapport à {prevMonth}.",
      },
      emergencyFund: {
        title: "Construisez votre fonds d'urgence",
        body: "Votre épargne couvre environ {months} mois de dépenses. Visez au moins 3 mois.",
      },
      debtHalfway: {
        title: "Beau progrès sur {title}",
        body: "Vous avez remboursé {pct}% de cette dette. Continuez la contribution mensuelle.",
      },
      savingsRate: {
        title: "Boostez votre taux d'épargne",
        body: "Votre taux d'épargne est de {rate}%. Essayez d'atteindre au moins 10–15 % des revenus.",
      },
      boostContribution: {
        title: "Atteignez {title} plus tôt",
        body: "Augmenter votre contribution mensuelle de 5 % vous aiderait à atteindre votre cible plus vite.",
      },
    },
    seed: {
      emergencyFund: "Fonds d'urgence",
      capeTownHoliday: "Vacances au Cap",
      carLoan: "Prêt automobile",
      creditCard: "Carte de crédit",
      retirementAnnuity: "Rente de retraite",
      etfPortfolio: "Portefeuille ETF",
    },
    cats: {
      housing: "Logement",
      transport: "Transport",
      food: "Alimentation",
      utilities: "Services",
      entertainment: "Loisirs",
      other: "Autres",
    },
  },

  es: {
    app: { name: "FinMate AI", tagline: "Tu asistente financiero amable" },
    nav: {
      home: "Inicio",
      dashboard: "Panel",
      reports: "Informes",
      settings: "Ajustes",
      profile: "Perfil",
      upgrade: "Ir a Pro",
      proLabel: "Pro ✓",
      skipToContent: "Saltar al contenido",
    },
    footer: {
      rights: "Todos los derechos reservados.",
      madeWith: "Hecho para quienes quieren que su dinero se comporte.",
    },
    common: {
      comingSoon: "Próximamente",
      backToDashboard: "Volver al panel",
      cancel: "Cancelar",
      close: "Cerrar",
      saving: "Guardando",
      loading: "Cargando",
      delete: "Eliminar",
      notifications: "Notificaciones",
    },
    home: {
      heroBadge: "Tu dinero, entendido",
      heroTitle: "Toma el control de tu dinero, una meta a la vez",
      heroSubtitle:
        "FinMate AI sigue tus metas de ahorro, deuda e inversión, convierte tus números en informes semanales y mensuales, y responde a tus preguntas sobre dinero en lenguaje sencillo.",
      ctaDashboard: "Abrir el panel",
      ctaUpgrade: "Explorar Pro",
      featuresTitle: "Todo lo que necesitas para ir por buen camino",
      features: [
        {
          title: "Seguimiento de metas",
          body: "Metas de ahorro, deuda e inversión con barras de progreso y fechas límite.",
        },
        {
          title: "Informes inteligentes",
          body: "Informes semanales y mensuales de ingresos, gastos y tasa de ahorro con gráficos.",
        },
        {
          title: "Asistente IA",
          body: "Haz preguntas como «¿Cuánto ahorré el mes pasado?» y obtén respuestas al instante.",
        },
        {
          title: "Alertas proactivas",
          body: "Recibe avisos cuando tus gastos superen tus ingresos antes de que duela.",
        },
        {
          title: "Tu idioma",
          body: "Inglés, Afrikaans, Français, Español y العربية — con soporte RTL completo.",
        },
        {
          title: "Privado por diseño",
          body: "Todos tus datos quedan en tu navegador. Sin cuenta, sin seguimiento, sin nube.",
        },
      ],
      trustLine:
        "Gratis para empezar · Sin necesidad de cuenta · Tus datos quedan en tu dispositivo",
    },
    dashboard: {
      title: "Panel",
      subtitle: "Tu dinero de un vistazo",
      alertTitle: "Gastos por encima de los ingresos",
      alertBody:
        "Tus gastos de {month} ({expenses}) superan tus ingresos ({income}). Intenta recortar gastos no esenciales este mes.",
      promoTitle: "Hazte Pro — desbloquea la imagen completa",
      promoBody:
        "Metas ilimitadas, análisis avanzados y exportación CSV. Un precio mensual bajo.",
      promoCta: "Ver funciones Pro",
      dismiss: "Descartar",
      goalsTitle: "Tus metas",
      addGoal: "Añadir meta",
      addGoalTitle: "Nueva meta",
      goalType: "Tipo",
      goalTitle: "Título",
      goalTarget: "Importe objetivo",
      goalCurrent: "Importe actual",
      goalDate: "Fecha límite (opcional)",
      goalMonthly: "Aporte mensual (opcional)",
      goalSubmit: "Crear meta",
      goalAdded: "Meta añadida",
      goalDeleted: "Meta eliminada",
      contributionAdded: "Aporte añadido",
      typeSavings: "Ahorro",
      typeDebt: "Deuda",
      typeInvestment: "Inversión",
      progress: "Progreso",
      of: "de",
      targetDate: "Fecha límite",
      monthlyContribution: "Aporte mensual",
      contribute: "Añadir",
      contributeLabel: "Cantidad a añadir",
      deleteGoal: "Eliminar meta",
      reportTitle: "Este mes",
      reportIncome: "Ingresos",
      reportExpenses: "Gastos",
      reportSavings: "Ahorro",
      reportRate: "Tasa de ahorro",
      viewFullReports: "Ver informes completos",
      lastSixMonths: "Últimos 6 meses",
      recommendationsTitle: "Recomendaciones inteligentes",
      assistantTitle: "Pregunta a FinMate",
      assistantPlaceholder: "Pregunta sobre tu dinero…",
      assistantSend: "Enviar",
      assistantTyping: "FinMate está pensando…",
      assistantGreeting:
        "¡Hola! Soy FinMate. Pregúntame cosas como «¿Cuánto ahorré el mes pasado?» o «Genera un informe de gastos de julio».",
      noGoals: "Aún no hay metas. Añade tu primera meta para empezar.",
    },
    settings: {
      title: "Ajustes",
      subtitle: "Personaliza tu experiencia FinMate",
      notifications: "Notificaciones",
      notificationsDesc:
        "Mostrar alertas proactivas cuando tus gastos superen tus ingresos.",
      currency: "Moneda",
      currencyDesc: "Cómo se formatean los importes en toda la aplicación.",
      language: "Idioma",
      languageDesc:
        "Elige tu idioma. El árabe cambia toda la aplicación a derecha-izquierda.",
      theme: "Apariencia",
      themeDesc: "Elige entre modo claro y oscuro.",
      light: "Claro",
      dark: "Oscuro",
      saved: "Ajustes guardados",
      resetData: "Restablecer datos de demostración",
      resetDataDesc:
        "Restaura las metas y el historial de ejemplo. Tus propias metas se reemplazarán.",
      resetConfirm:
        "Esto reemplazará tus metas e historial con los datos de ejemplo. ¿Continuar?",
      dataReset: "Datos de demostración restaurados",
    },
    reports: {
      title: "Informes",
      subtitle: "Desgloses semanales y mensuales con información inteligente",
      tabWeekly: "Semanal",
      tabMonthly: "Mensual",
      weeklyDesc: "Ingresos y gastos semanales medios de {month}.",
      monthlyDesc: "Tus últimos 6 meses de un vistazo.",
      incomeVsExpenses: "Ingresos vs gastos",
      categoryBreakdown: "Desglose por categoría",
      savingsTrend: "Tendencia del ahorro",
      insightsTitle: "Información inteligente",
      exportCsv: "Exportar CSV",
      exportDone: "CSV descargado",
      exportProNote: "La exportación CSV es una función Pro",
      lockedTitle:
        "Los informes semanales, los desgloses por categoría y la exportación CSV son funciones Pro",
      lockedBody:
        "Tu plan Gratis incluye el resumen del mes actual. Hazte Pro para informes semanales y mensuales, análisis avanzados y exportaciones CSV.",
      lockedCta: "Hazte Pro",
      currentMonth: "Mes actual",
      noData:
        "Aún no hay datos de informes — abre Ajustes y restaura los datos de demostración.",
    },
    upgrade: {
      title: "Hazte Pro",
      subtitle: "Compara los planes y elige el que te encaje",
      currentPlan: "Plan actual",
      freeBadge: "Gratis",
      proBadge: "Pro",
      youArePro: "Ya eres Pro — ¡gracias por apoyar a FinMate!",
      youAreProDesc:
        "Metas ilimitadas, informes semanales y mensuales, análisis avanzados y exportación CSV están desbloqueados en este dispositivo.",
      priceFree: "R 0",
      pricePro: "R 79",
      perMonth: "/ mes",
      feature: "Función",
      rowGoals: "Metas",
      rowGoalsFree: "Hasta 3",
      rowGoalsPro: "Ilimitadas",
      rowReports: "Informes",
      rowReportsFree: "Mes actual",
      rowReportsPro: "Semanal + mensual",
      rowInsights: "Información inteligente",
      rowInsightsFree: "Básica",
      rowInsightsPro: "Avanzada",
      rowExport: "Exportación CSV",
      rowExportFree: "—",
      rowExportPro: "Incluida",
      rowAssistant: "Asistente IA",
      rowAssistantFree: "Estándar",
      rowAssistantPro: "Prioritario",
      payButton: "Pagar {price} con PayFast",
      payfastTitle: "Pago seguro vía PayFast",
      payfastSetupTitle: "Estamos configurando los pagos",
      payfastSetupBody:
        "El pago de PayFast aparecerá aquí cuando se configuren las credenciales del comercio. Mientras tanto, prueba la demo Pro — no se realiza ningún pago real.",
      demoUnlock: "Probar la demo Pro",
      demoUnlockDesc:
        "Modo demo: tu plan se guarda localmente en este navegador. Sin pago real.",
      demoUnlocked:
        "¡Demo Pro desbloqueada — metas ilimitadas e informes completos ya activos!",
      securedBy: "Protegido por PayFast (ZAR)",
      back: "Quizá más tarde",
    },
    profile: {
      title: "Perfil",
      subtitle: "Tus datos y tu salud financiera",
      name: "Nombre",
      email: "Correo",
      save: "Guardar cambios",
      saved: "Perfil guardado",
      plan: "Plan",
      upgrade: "Hazte Pro",
      managePlan: "Gestionar plan",
      healthTitle: "Puntuación de salud financiera",
      healthDesc:
        "Calculada a partir de tu tasa de ahorro, el progreso de tus deudas y tu fondo de emergencia.",
      outOf100: "de 100",
    },
    assistant: {
      savedLastMonth:
        "Ahorraste {amount} el mes pasado ({month}): ingresos {income}, gastos {expenses}.",
      savedThisMonth:
        "Hasta ahora este mes ({month}): ingresos {income}, gastos {expenses} — eso es {amount} ahorrado.",
      expenseReport:
        "Este es el informe de gastos de {month}. Gastos totales: {expenses}. Primera categoría: {topCategory} ({topAmount}). Categorías: {categories}.",
      noDataForMonth:
        "No tengo registros de {month}. El mes más reciente que tengo es {latestMonth}.",
      balance: "En todas tus metas tienes actualmente {amount} apartados.",
      summary:
        "Este es tu resumen de {month}: ingresos {income}, gastos {expenses}, ahorro {savings} (tasa de ahorro {rate}). Apartado en tus metas: {balance}.",
      goalsDetail: "Así van tus metas:\n{lines}",
      noGoals: "Aún no tienes metas. Añade tu primera meta desde el panel.",
      of: "de",
      recommend: "Estas son mis recomendaciones:\n{list}",
      hello:
        "¡Hola! 👋 Pregúntame sobre tu ahorro, tus gastos o tus metas — por ejemplo «¿Cuánto ahorré el mes pasado?»",
      help: "Puedo ayudarte con:\n• «¿Cuánto ahorré el mes pasado?»\n• «Genera un informe de gastos de {month}»\n• «¿Cuál es mi saldo?»\n• «¿Cuáles son mis metas?»\n• «¿Alguna recomendación?»",
      suggestion1: "¿Cuánto ahorré el mes pasado?",
      suggestion2: "Genera un informe de gastos de {month}",
      suggestion3: "¿Cuál es mi saldo?",
      suggestion4: "¿Cuáles son mis metas?",
      suggestionsLabel: "Preguntas sugeridas",
      fallback:
        "No te he entendido bien. Prueba con «¿Cuánto ahorré el mes pasado?» o «Genera un informe de gastos de julio».",
      months: [
        "enero",
        "febrero",
        "marzo",
        "abril",
        "mayo",
        "junio",
        "julio",
        "agosto",
        "septiembre",
        "octubre",
        "noviembre",
        "diciembre",
      ],
    },
    insights: {
      title: "Información inteligente",
      savingsRateUp: {
        title: "Tasa de ahorro al alza",
        body: "Tu tasa de ahorro subió al {rate} este mes, frente al {prevRate} del mes pasado.",
      },
      savingsRateDown: {
        title: "Tasa de ahorro a la baja",
        body: "Tu tasa de ahorro bajó al {rate} — era del {prevRate} el mes pasado.",
      },
      savingsRateSteady: {
        title: "Tasa de ahorro estable",
        body: "Tu tasa de ahorro se mantuvo en el {rate} este mes.",
      },
      topCategory: {
        title: "Categoría de gasto principal",
        body: "{category} fue tu mayor gasto este mes, con {amount}.",
      },
      runway: {
        title: "Colchón",
        body: "Tus ahorros cubren unos {days} días de gastos.",
      },
      expensesRising: {
        title: "Gastos al alza",
        body: "Los gastos subieron un {pct} respecto al mes pasado.",
      },
      expensesFalling: {
        title: "Gastos a la baja",
        body: "Los gastos bajaron un {pct} respecto al mes pasado — buen trabajo.",
      },
    },
    health: {
      savingsRate: "Tasa de ahorro",
      debtProgress: "Pago de deudas",
      emergencyCoverage: "Fondo de emergencia",
      months: "≈ {months} meses",
      excellent: "Excelente",
      good: "Bien",
      fair: "Aceptable",
      needsWork: "Necesita trabajo",
    },
    plan: {
      goalLimit:
        "El plan Gratis incluye hasta {max} metas. Hazte Pro para metas ilimitadas.",
      moreGoals: "Tienes {count} metas más en Pro.",
      goalCount: "{count}/{max} metas",
    },
    csv: {
      goalsSection: "Metas",
      monthlySection: "Resumen mensual",
      type: "Tipo",
      title: "Título",
      current: "Actual",
      target: "Objetivo",
      progress: "Progreso %",
      targetDate: "Fecha límite",
      monthlyContribution: "Aporte mensual",
      month: "Mes",
      income: "Ingresos",
      expenses: "Gastos",
      savings: "Ahorro",
      savingsRate: "Tasa de ahorro %",
    },
    checkout: {
      successTitle: "Pago realizado",
      successBody:
        "Tu suscripción a FinMate Pro ya está activa: metas ilimitadas, informes semanales y mensuales, análisis avanzados y exportación CSV están desbloqueados.",
      successNote: "Revisa tu correo para el recibo de PayFast.",
      successCta: "Ir al panel",
      cancelTitle: "Pago cancelado",
      cancelBody:
        "No se ha realizado ningún cargo y tu cuenta no ha cambiado. Puedes hacerte Pro cuando quieras.",
      cancelCta: "Volver a la suscripción",
      cancelAlt: "Ir al panel",
    },
    rec: {
      expensesAboveIncome: {
        title: "Los gastos superaron los ingresos",
        body: "El gasto alcanzó {expenses} frente a {income} de ingresos — {pct}% más que el mes pasado. Revisa los gastos no esenciales.",
      },
      expensesRising: {
        title: "Los gastos están aumentando",
        body: "El gasto subió un {pct}% este mes en comparación con {prevMonth}.",
      },
      emergencyFund: {
        title: "Construye tu fondo de emergencia",
        body: "Tus ahorros cubren aproximadamente {months} meses de gastos. Apunta al menos a 3 meses.",
      },
      debtHalfway: {
        title: "Buen progreso en {title}",
        body: "Has pagado el {pct}% de esta deuda. Sigue con el aporte mensual.",
      },
      savingsRate: {
        title: "Impulsa tu tasa de ahorro",
        body: "Tu tasa de ahorro es del {rate}%. Intenta alcanzar al menos el 10–15 % de los ingresos.",
      },
      boostContribution: {
        title: "Alcanza {title} antes",
        body: "Aumentar tu aporte mensual un 5 % te ayudaría a alcanzar tu objetivo más rápido.",
      },
    },
    seed: {
      emergencyFund: "Fondo de emergencia",
      capeTownHoliday: "Vacaciones en Ciudad del Cabo",
      carLoan: "Préstamo del coche",
      creditCard: "Tarjeta de crédito",
      retirementAnnuity: "Renta de jubilación",
      etfPortfolio: "Cartera de ETF",
    },
    cats: {
      housing: "Vivienda",
      transport: "Transporte",
      food: "Alimentación",
      utilities: "Servicios",
      entertainment: "Ocio",
      other: "Otros",
    },
  },

  ar: {
    app: { name: "FinMate AI", tagline: "مساعدك المالي الودود" },
    nav: {
      home: "الرئيسية",
      dashboard: "لوحة التحكم",
      reports: "التقارير",
      settings: "الإعدادات",
      profile: "الملف الشخصي",
      upgrade: "الانتقال إلى Pro",
      proLabel: "Pro ✓",
      skipToContent: "تخطَّ إلى المحتوى",
    },
    footer: {
      rights: "جميع الحقوق محفوظة.",
      madeWith: "صُنع لأشخاص يريدون لأموالهم أن تتصرف بشكل جيد.",
    },
    common: {
      comingSoon: "قريباً",
      backToDashboard: "العودة إلى لوحة التحكم",
      cancel: "إلغاء",
      close: "إغلاق",
      saving: "جارٍ الحفظ",
      loading: "جارٍ التحميل",
      delete: "حذف",
      notifications: "الإشعارات",
    },
    home: {
      heroBadge: "أموالك، مفهومة",
      heroTitle: "تحكَّم في أموالك، هدفاً تلو الآخر",
      heroSubtitle:
        "يتابع FinMate AI أهدافك في الادخار والديون والاستثمار، ويحوّل أرقامك إلى تقارير أسبوعية وشهرية، ويجيب عن أسئلتك المالية بلغة بسيطة.",
      ctaDashboard: "افتح لوحة التحكم",
      ctaUpgrade: "استكشف Pro",
      featuresTitle: "كل ما تحتاجه للبقاء على المسار الصحيح",
      features: [
        {
          title: "تتبّع الأهداف",
          body: "أهداف ادخار وديون واستثمار مع أشرطة تقدّم حيّة وتواريخ استهداف.",
        },
        {
          title: "تقارير ذكية",
          body: "تقارير أسبوعية وشهرية للدخل والمصروفات ومعدل الادخار مع رسوم بيانية.",
        },
        {
          title: "مساعد ذكاء اصطناعي",
          body: "اطرح أسئلة مثل «كم ادّخرت الشهر الماضي؟» واحصل على إجابات فورية.",
        },
        {
          title: "تنبيهات استباقية",
          body: "تحذير عندما تتجاوز مصروفاتك دخلك قبل أن يؤلمك ذلك.",
        },
        {
          title: "بلغتك",
          body: "الإنجليزية، الأفريكانية، الفرنسية، الإسبانية والعربية — مع دعم كامل للاتجاه من اليمين إلى اليسار.",
        },
        {
          title: "خصوصية بالتصميم",
          body: "تبقى جميع بياناتك في متصفحك. لا حساب، لا تتبّع، لا سحابة.",
        },
      ],
      trustLine: "مجاني للبدء · لا حاجة لحساب · تبقى بياناتك على جهازك",
    },
    dashboard: {
      title: "لوحة التحكم",
      subtitle: "أموالك في لمحة",
      alertTitle: "المصروفات تتجاوز الدخل",
      alertBody:
        "مصروفات {month} ({expenses}) أعلى من دخلك ({income}). حاول تقليص الإنفاق غير الضروري هذا الشهر.",
      promoTitle: "اشترك في Pro — افتح الصورة الكاملة",
      promoBody:
        "أهداف غير محدودة وتحليلات متقدمة وتصدير CSV. بسعر شهري واحد منخفض.",
      promoCta: "اطّلع على مزايا Pro",
      dismiss: "تجاهل",
      goalsTitle: "أهدافك",
      addGoal: "إضافة هدف",
      addGoalTitle: "هدف جديد",
      goalType: "النوع",
      goalTitle: "العنوان",
      goalTarget: "المبلغ المستهدف",
      goalCurrent: "المبلغ الحالي",
      goalDate: "تاريخ الاستهداف (اختياري)",
      goalMonthly: "المساهمة الشهرية (اختيارية)",
      goalSubmit: "إنشاء الهدف",
      goalAdded: "تمت إضافة الهدف",
      goalDeleted: "تم حذف الهدف",
      contributionAdded: "تمت إضافة المساهمة",
      typeSavings: "ادخار",
      typeDebt: "دين",
      typeInvestment: "استثمار",
      progress: "التقدّم",
      of: "من",
      targetDate: "تاريخ الاستهداف",
      monthlyContribution: "المساهمة الشهرية",
      contribute: "إضافة",
      contributeLabel: "المبلغ المراد إضافته",
      deleteGoal: "حذف الهدف",
      reportTitle: "هذا الشهر",
      reportIncome: "الدخل",
      reportExpenses: "المصروفات",
      reportSavings: "الادخار",
      reportRate: "معدل الادخار",
      viewFullReports: "عرض التقارير الكاملة",
      lastSixMonths: "آخر 6 أشهر",
      recommendationsTitle: "توصيات ذكية",
      assistantTitle: "اسأل FinMate",
      assistantPlaceholder: "اسأل عن أموالك…",
      assistantSend: "إرسال",
      assistantTyping: "FinMate يفكّر…",
      assistantGreeting:
        "مرحباً! أنا FinMate. اسألني مثل «كم ادّخرت الشهر الماضي؟» أو «أنشئ تقرير مصروفات يوليو».",
      noGoals: "لا توجد أهداف بعد. أضف هدفك الأول لتبدأ التتبّع.",
    },
    settings: {
      title: "الإعدادات",
      subtitle: "خصص تجربتك مع FinMate",
      notifications: "الإشعارات",
      notificationsDesc: "عرض تنبيهات استباقية عندما تتجاوز مصروفاتك دخلك.",
      currency: "العملة",
      currencyDesc: "كيف تُنسَّق المبالغ في جميع أنحاء التطبيق.",
      language: "اللغة",
      languageDesc:
        "اختر لغتك. العربية تبدّل التطبيق بالكامل إلى الاتجاه من اليمين إلى اليسار.",
      theme: "المظهر",
      themeDesc: "اختر بين الوضع الفاتح والوضع الداكن.",
      light: "فاتح",
      dark: "داكن",
      saved: "تم حفظ الإعدادات",
      resetData: "إعادة تعيين البيانات التجريبية",
      resetDataDesc:
        "استعادة الأهداف والسجل النموذجيين. ستُستبدل أهدافك الخاصة.",
      resetConfirm:
        "سيؤدي هذا إلى استبدال أهدافك وسجلك بالبيانات النموذجية. هل تريد المتابعة؟",
      dataReset: "تمت استعادة البيانات التجريبية",
    },
    reports: {
      title: "التقارير",
      subtitle: "تفاصيل أسبوعية وشهرية مع رؤى ذكية",
      tabWeekly: "أسبوعي",
      tabMonthly: "شهري",
      weeklyDesc: "متوسط الدخل والمصروفات الأسبوعي لشهر {month}.",
      monthlyDesc: "آخر 6 أشهر في لمحة.",
      incomeVsExpenses: "الدخل مقابل المصروفات",
      categoryBreakdown: "توزيع الفئات",
      savingsTrend: "اتجاه الادخار",
      insightsTitle: "رؤى ذكية",
      exportCsv: "تصدير CSV",
      exportDone: "تم تنزيل CSV",
      exportProNote: "تصدير CSV ميزة في Pro",
      lockedTitle: "التقارير الأسبوعية وتوزيع الفئات وتصدير CSV هي ميزات Pro",
      lockedBody:
        "تشمل خطتك المجانية ملخص الشهر الحالي. اشترك في Pro للحصول على التقارير الأسبوعية والشهرية والتحليلات المتقدمة وتصديرات CSV.",
      lockedCta: "اشترك في Pro",
      currentMonth: "الشهر الحالي",
      noData:
        "لا توجد بيانات تقارير بعد — افتح الإعدادات واستعد البيانات التجريبية.",
    },
    upgrade: {
      title: "اشترك في Pro",
      subtitle: "قارن الخطط واختر ما يناسبك",
      currentPlan: "الخطة الحالية",
      freeBadge: "مجاني",
      proBadge: "Pro",
      youArePro: "أنت مشترك في Pro — شكراً لدعمك FinMate!",
      youAreProDesc:
        "الأهداف غير المحدودة والتقارير الأسبوعية والشهرية والتحليلات المتقدمة وتصدير CSV مفعّلة على هذا الجهاز.",
      priceFree: "R 0",
      pricePro: "R 79",
      perMonth: "/ شهرياً",
      feature: "الميزة",
      rowGoals: "الأهداف",
      rowGoalsFree: "حتى 3",
      rowGoalsPro: "غير محدودة",
      rowReports: "التقارير",
      rowReportsFree: "الشهر الحالي",
      rowReportsPro: "أسبوعي + شهري",
      rowInsights: "رؤى ذكية",
      rowInsightsFree: "أساسية",
      rowInsightsPro: "متقدمة",
      rowExport: "تصدير CSV",
      rowExportFree: "—",
      rowExportPro: "مشمول",
      rowAssistant: "المساعد الذكي",
      rowAssistantFree: "قياسي",
      rowAssistantPro: "ذو أولوية",
      payButton: "ادفع {price} عبر PayFast",
      payfastTitle: "دفع آمن عبر PayFast",
      payfastSetupTitle: "جارٍ إعداد المدفوعات",
      payfastSetupBody:
        "ستظهر صفحة دفع PayFast هنا بمجرد إعداد بيانات التاجر. في هذه الأثناء يمكنك تجربة النسخة التجريبية من Pro — دون أي دفعة حقيقية.",
      demoUnlock: "جرّب نسخة Pro التجريبية",
      demoUnlockDesc:
        "وضع تجريبي: تُخزَّن خطتك محلياً في هذا المتصفح. لا توجد دفعة حقيقية.",
      demoUnlocked:
        "تم تفعيل النسخة التجريبية من Pro — الأهداف غير المحدودة والتقارير الكاملة نشطة الآن!",
      securedBy: "مؤمَّن عبر PayFast (ZAR)",
      back: "ربما لاحقاً",
    },
    profile: {
      title: "الملف الشخصي",
      subtitle: "بياناتك وصحتك المالية",
      name: "الاسم",
      email: "البريد الإلكتروني",
      save: "حفظ التغييرات",
      saved: "تم حفظ الملف الشخصي",
      plan: "الخطة",
      upgrade: "اشترك في Pro",
      managePlan: "إدارة الخطة",
      healthTitle: "درجة الصحة المالية",
      healthDesc:
        "تُحسب من معدل ادخارك، وتقدم سداد ديونك، وتغطية صندوق الطوارئ.",
      outOf100: "من 100",
    },
    assistant: {
      savedLastMonth:
        "ادّخرت {amount} الشهر الماضي ({month}): الدخل {income}، المصروفات {expenses}.",
      savedThisMonth:
        "حتى الآن هذا الشهر ({month}): الدخل {income}، المصروفات {expenses} — هذا {amount} مُدّخر.",
      expenseReport:
        "هذا تقرير مصروفات {month}. إجمالي المصروفات: {expenses}. أكبر فئة: {topCategory} ({topAmount}). الفئات: {categories}.",
      noDataForMonth:
        "ليس لديّ سجلات لشهر {month}. أحدث شهر لديّ هو {latestMonth}.",
      balance: "لديك حالياً {amount} مدّخرة عبر أهدافك.",
      summary:
        "هذا ملخص {month}: الدخل {income}، المصروفات {expenses}، الادخار {savings} (معدل ادخار {rate}). المخصَّص عبر الأهداف: {balance}.",
      goalsDetail: "إليك وضع أهدافك:\n{lines}",
      noGoals: "لا تملك أهدافاً بعد. أضف هدفك الأول من لوحة التحكم.",
      of: "من",
      recommend: "إليك توصياتي:\n{list}",
      hello:
        "مرحباً! 👋 اسألني عن مدخراتك أو مصروفاتك أو أهدافك — مثلاً «كم ادّخرت الشهر الماضي؟»",
      help: "يمكنني مساعدتك في:\n• «كم ادّخرت الشهر الماضي؟»\n• «أنشئ تقرير مصروفات {month}»\n• «ما هو رصيدي؟»\n• «ما هي أهدافي؟»\n• «أي توصيات؟»",
      suggestion1: "كم ادّخرت الشهر الماضي؟",
      suggestion2: "أنشئ تقرير مصروفات {month}",
      suggestion3: "ما هو رصيدي؟",
      suggestion4: "ما هي أهدافي؟",
      suggestionsLabel: "أسئلة مقترحة",
      fallback:
        "لم أفهم تماماً. جرّب «كم ادّخرت الشهر الماضي؟» أو «أنشئ تقرير مصروفات يوليو».",
      months: [
        "يناير",
        "فبراير",
        "مارس",
        "أبريل",
        "مايو",
        "يونيو",
        "يوليو",
        "أغسطس",
        "سبتمبر",
        "أكتوبر",
        "نوفمبر",
        "ديسمبر",
      ],
    },
    insights: {
      title: "رؤى ذكية",
      savingsRateUp: {
        title: "معدل الادخار في ارتفاع",
        body: "ارتفع معدل ادخارك إلى {rate} هذا الشهر، من {prevRate} الشهر الماضي.",
      },
      savingsRateDown: {
        title: "معدل الادخار في انخفاض",
        body: "انخفض معدل ادخارك إلى {rate} — كان {prevRate} الشهر الماضي.",
      },
      savingsRateSteady: {
        title: "معدل ادخار مستقر",
        body: "ثبت معدل ادخارك عند {rate} هذا الشهر.",
      },
      topCategory: {
        title: "أكبر فئة إنفاق",
        body: "كانت {category} أكبر مصروفاتك هذا الشهر بمبلغ {amount}.",
      },
      runway: {
        title: "المدرج المالي",
        body: "يغطي ادخارك حوالي {days} يوماً من المصروفات.",
      },
      expensesRising: {
        title: "المصروفات في ارتفاع",
        body: "ارتفعت المصروفات بنسبة {pct} مقارنة بالشهر الماضي.",
      },
      expensesFalling: {
        title: "المصروفات في انخفاض",
        body: "انخفضت المصروفات بنسبة {pct} مقارنة بالشهر الماضي — عمل رائع.",
      },
    },
    health: {
      savingsRate: "معدل الادخار",
      debtProgress: "سداد الديون",
      emergencyCoverage: "تغطية صندوق الطوارئ",
      months: "≈ {months} شهراً",
      excellent: "ممتاز",
      good: "جيد",
      fair: "مقبول",
      needsWork: "يحتاج عملاً",
    },
    plan: {
      goalLimit:
        "تتضمن الخطة المجانية حتى {max} أهداف. اشترك في Pro للحصول على أهداف غير محدودة.",
      moreGoals: "لديك {count} أهداف إضافية في Pro.",
      goalCount: "{count}/{max} أهداف",
    },
    csv: {
      goalsSection: "الأهداف",
      monthlySection: "الملخص الشهري",
      type: "النوع",
      title: "العنوان",
      current: "الحالي",
      target: "المستهدف",
      progress: "التقدّم %",
      targetDate: "تاريخ الاستهداف",
      monthlyContribution: "المساهمة الشهرية",
      month: "الشهر",
      income: "الدخل",
      expenses: "المصروفات",
      savings: "الادخار",
      savingsRate: "معدل الادخار %",
    },
    checkout: {
      successTitle: "تم الدفع بنجاح",
      successBody:
        "اشتراكك في FinMate Pro نشط الآن: الأهداف غير المحدودة والتقارير الأسبوعية والشهرية والتحليلات المتقدمة وتصديرات CSV مفعّلة.",
      successNote: "تحقق من بريدك الإلكتروني لاستلام إيصال PayFast.",
      successCta: "انتقل إلى لوحة التحكم",
      cancelTitle: "تم إلغاء الدفع",
      cancelBody: "لم يتم فرض أي رسوم وحسابك لم يتغير. يمكنك الترقية متى شئت.",
      cancelCta: "العودة إلى الترقية",
      cancelAlt: "انتقل إلى لوحة التحكم",
    },
    rec: {
      expensesAboveIncome: {
        title: "تجاوزت المصروفات الدخل",
        body: "بلغ الإنفاق {expenses} مقابل دخل {income} — أعلى بنسبة {pct}% من الشهر الماضي. راجع المصروفات غير الضرورية.",
      },
      expensesRising: {
        title: "المصروفات في ارتفاع",
        body: "ارتفع الإنفاق بنسبة {pct}% هذا الشهر مقارنة بـ {prevMonth}.",
      },
      emergencyFund: {
        title: "ابنِ صندوق الطوارئ الخاص بك",
        body: "يغطي ادخارك حوالي {months} شهراً من المصروفات. استهدف 3 أشهر على الأقل.",
      },
      debtHalfway: {
        title: "تقدّم رائع في {title}",
        body: "سدّدت {pct}% من هذا الدين. واصل المساهمة الشهرية.",
      },
      savingsRate: {
        title: "عزّز معدل ادخارك",
        body: "معدل ادخارك {rate}%. حاول الوصول إلى 10–15% على الأقل من الدخل.",
      },
      boostContribution: {
        title: "حقّق {title} عاجلاً",
        body: "زيادة مساهمتك الشهرية بنسبة 5% ستساعدك على بلوغ هدفك بشكل أسرع.",
      },
    },
    seed: {
      emergencyFund: "صندوق الطوارئ",
      capeTownHoliday: "عطلة في كيب تاون",
      carLoan: "قرض السيارة",
      creditCard: "بطاقة الائتمان",
      retirementAnnuity: "معاش التقاعد",
      etfPortfolio: "محفظة ETF",
    },
    cats: {
      housing: "السكن",
      transport: "المواصلات",
      food: "الطعام",
      utilities: "الخدمات",
      entertainment: "الترفيه",
      other: "أخرى",
    },
  },
};

// Look up a dotted key in a language's tree, falling back to English.
function lookup(tree, key) {
  return key
    .split(".")
    .reduce((acc, part) => (acc == null ? undefined : acc[part]), tree);
}

// Translate: t(lang, "dashboard.reportIncome") or t(lang, "assistant.savedLastMonth", { amount: "R 1,700" })
export function translate(lang, key, vars) {
  let str = lookup(translations[lang], key);
  if (str == null) str = lookup(translations.en, key);
  if (str == null) return key;
  if (vars) {
    for (const [name, value] of Object.entries(vars)) {
      str = str.split(`{${name}}`).join(String(value));
    }
  }
  return str;
}

export function getMonths(lang) {
  const months = translations[lang]?.assistant?.months;
  return months && months.length === 12
    ? months
    : translations.en.assistant.months;
}

export function getLangMeta(code) {
  return LANGUAGES.find((l) => l.code === code) || LANGUAGES[0];
}

export function formatCurrency(amount, currency, locale) {
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${currency} ${Number(amount).toFixed(0)}`;
  }
}

export function formatPercent(value, locale) {
  try {
    return `${value.toLocaleString(locale, { maximumFractionDigits: 1 })}%`;
  } catch {
    return `${value}%`;
  }
}
