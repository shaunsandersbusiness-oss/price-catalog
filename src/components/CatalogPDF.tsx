import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';
import { CatalogData, PriceRow } from '../data/prices';

// Register fonts
Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/helveticaneue/v70/1Ptsg8zYS_SKggPNyC0IT4ttDfA.ttf' }, // Regular
    { src: 'https://fonts.gstatic.com/s/helveticaneue/v70/1Ptsg8zYS_SKggPNyC0IT4ttDfA.ttf', fontWeight: 'bold' }, // Bold (using same for now as placeholder, usually need separate files)
  ]
});

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
    fontSize: 9,
    color: '#d4d4d4',
    backgroundColor: '#000000',
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#c9a84c',
    paddingBottom: 5,
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#c9a84c',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  subHeader: {
    fontSize: 10,
    textAlign: 'center',
    marginTop: 2,
    color: '#ffffff',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
    textTransform: 'uppercase',
    color: '#ffffff',
  },
  subSectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 10,
    marginBottom: 5,
  },
  description: {
    fontSize: 8,
    fontStyle: 'italic',
    marginBottom: 8,
    color: '#999999',
  },
  table: {
    width: '100%',
    marginBottom: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    color: '#c9a84c',
    padding: 4,
    alignItems: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#333333',
    padding: 4,
    alignItems: 'center',
  },
  rowEven: {
    backgroundColor: '#0a0a0a',
  },
  colService: {
    width: '30%',
    fontWeight: 'bold',
    color: '#ffffff',
  },
  colPrice: {
    width: '11%',
    textAlign: 'center',
  },
  colAddOnService: {
    width: '70%',
    fontWeight: 'bold',
    color: '#ffffff',
  },
  colAddOnPrice: {
    width: '30%',
    textAlign: 'right',
    color: '#ffffff',
  },
  packageTable: {
    marginTop: 10,
  },
  packageRow: {
    flexDirection: 'row',
    padding: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  packageColName: {
    width: '15%',
    fontWeight: 'bold',
    color: '#ffffff',
  },
  packageColSvc: {
    width: '10%',
    textAlign: 'center',
  },
  packageColDiscount: {
    width: '15%',
    textAlign: 'center',
    color: '#c9a84c',
  },
  packageColIncluded: {
    width: '60%',
  },
  comparisonRow: {
    flexDirection: 'row',
    padding: 4,
    borderBottomWidth: 0.5,
    borderBottomColor: '#333333',
  },
  compColService: {
    width: '40%',
    fontWeight: 'bold',
    color: '#ffffff',
  },
  compColVal: {
    width: '20%',
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 30,
    right: 30,
    fontSize: 8,
    textAlign: 'center',
    color: '#666666',
  }
});

interface CatalogPDFProps {
  data: CatalogData;
}

const PriceTable = ({ rows, sqftRanges, showHeader = true }: { rows: PriceRow[], sqftRanges?: string[], showHeader?: boolean }) => (
  <View style={styles.table}>
    {showHeader && sqftRanges && (
      <View style={styles.tableHeader}>
        <Text style={[styles.colService, { width: '25%' }]}> </Text>
        {sqftRanges.map((range, i) => (
          <Text key={i} style={[styles.colPrice, { width: '12.5%', fontSize: 7 }]}>{range.replace(' sqft', '')}</Text>
        ))}
      </View>
    )}
    {rows.map((row, i) => (
      <View key={i} style={[styles.tableRow, i % 2 === 0 ? styles.rowEven : {}]}>
        <Text style={[styles.colService, { width: '25%', fontSize: 8 }]}>{row.service}</Text>
        {row.prices.map((price, j) => (
          <Text key={j} style={[styles.colPrice, { width: '12.5%' }]}>
            {typeof price === 'number' ? `$${price}` : price}
          </Text>
        ))}
      </View>
    ))}
  </View>
);

const AddOnTable = ({ addOns }: { addOns: { service: string, price: string }[] }) => (
  <View style={styles.table}>
    <View style={styles.tableHeader}>
      <Text style={styles.colAddOnService}>Service</Text>
      <Text style={styles.colAddOnPrice}>Price</Text>
    </View>
    {addOns.map((row, i) => (
      <View key={i} style={[styles.tableRow, i % 2 === 0 ? styles.rowEven : {}]}>
        <Text style={styles.colAddOnService}>{row.service}</Text>
        <Text style={styles.colAddOnPrice}>{row.price}</Text>
      </View>
    ))}
  </View>
);

export const CatalogPDF = ({ data }: CatalogPDFProps) => (
  <Document>
    {/* Page 1: Photography */}
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.logoText}>REGALIS REALTY MEDIA</Text>
        <Text style={styles.subHeader}>Complete Service Menu — {data.market} — {data.year}</Text>
      </View>

      <Text style={styles.sectionTitle}>PHOTOGRAPHY</Text>
      <Text style={styles.description}>HDR photography priced by property square footage. All photos include window pull & sky replacement.</Text>
      
      <PriceTable rows={data.photography.rows} sqftRanges={data.sqftRanges} />

      <Text style={styles.subSectionTitle}>Photo Add-Ons</Text>
      <AddOnTable addOns={data.photography.addOns} />

      <View style={{ marginTop: 10 }}>
        <PriceTable rows={data.photography.floorPlans} sqftRanges={data.sqftRanges} />
        <Text style={[styles.description, { marginTop: 2, color: '#0000aa' }]}>
          Floor Plan included in Silver & Gold. 3D Interactive Tour included in Gold. Ordering both gives you a marketing floor plan + interactive floor plan.
        </Text>
      </View>

      <Text style={styles.subSectionTitle}>Twilight Services</Text>
      <Text style={styles.description}>{data.photography.twilight.description}</Text>
      <PriceTable rows={data.photography.twilight.rows} sqftRanges={data.sqftRanges} />
      
      <View style={{ marginTop: 5 }}>
        <AddOnTable addOns={data.photography.twilight.addOns} />
      </View>
    </Page>

    {/* Page 2: Video */}
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.logoText}>REGALIS REALTY MEDIA</Text>
        <Text style={styles.subHeader}>Complete Service Menu — {data.market} — {data.year}</Text>
      </View>

      <Text style={styles.sectionTitle}>VIDEO PRODUCTION — Listing Videos</Text>
      
      <Text style={styles.subSectionTitle}>Quick Tour — Flat Rate</Text>
      <Text style={styles.description}>{data.video.quickTour.description}</Text>
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={{ width: '40%' }}>Service</Text>
          <Text style={{ width: '30%', textAlign: 'center' }}>Price</Text>
          <Text style={{ width: '30%', textAlign: 'center' }}>Format</Text>
        </View>
        {data.video.quickTour.rows.map((row, i) => (
          <View key={i} style={styles.tableRow}>
            <Text style={{ width: '40%', fontWeight: 'bold' }}>{row.service}</Text>
            <Text style={{ width: '30%', textAlign: 'center' }}>{row.prices[0]}</Text>
            <Text style={{ width: '30%', textAlign: 'center' }}>{row.prices[1]}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.subSectionTitle}>Standard & Cinematic — By Square Footage</Text>
      <Text style={styles.description}>{data.video.standardCinematic.description}</Text>
      <PriceTable rows={data.video.standardCinematic.rows} sqftRanges={data.sqftRanges} />

      <Text style={styles.sectionTitle}>VIDEO PRODUCTION — Brand & Community Videos (Flat Rate)</Text>
      <Text style={styles.description}>{data.video.brandCommunity.description}</Text>
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={{ width: '40%' }}>Service</Text>
          <Text style={{ width: '20%', textAlign: 'center' }}>Price</Text>
          <Text style={{ width: '20%', textAlign: 'center' }}>Agent</Text>
          {data.market === 'NJ & Boroughs' && <Text style={{ width: '20%', textAlign: 'center' }}>Drone</Text>}
        </View>
        {data.video.brandCommunity.rows.map((row, i) => (
          <View key={i} style={styles.tableRow}>
            <Text style={{ width: '40%', fontWeight: 'bold' }}>{row.service}</Text>
            <Text style={{ width: '20%', textAlign: 'center' }}>{row.prices[0]}</Text>
            <Text style={{ width: '20%', textAlign: 'center' }}>{row.prices[1]}</Text>
            {data.market === 'NJ & Boroughs' && <Text style={{ width: '20%', textAlign: 'center' }}>{row.prices[2]}</Text>}
          </View>
        ))}
      </View>

      <Text style={styles.subSectionTitle}>Video Add-Ons</Text>
      <AddOnTable addOns={data.video.addOns} />

      <Text style={styles.sectionTitle}>OTHER SERVICES</Text>
      <AddOnTable addOns={data.otherServices} />
      <Text style={[styles.description, { color: '#0000aa' }]}>
        Included at no charge with all services & packages. $150 if ordered standalone without any other booking.
      </Text>
    </Page>

    {/* Page 3: Packages */}
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.logoText}>REGALIS REALTY MEDIA</Text>
        <Text style={styles.subHeader}>Complete Service Menu — {data.market} — {data.year}</Text>
      </View>

      <Text style={styles.sectionTitle}>PACKAGE PRICING — Save When You Bundle</Text>
      <Text style={styles.description}>{data.packages.description}</Text>

      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.packageColName}>Package</Text>
          <Text style={styles.packageColSvc}>Svc</Text>
          <Text style={styles.packageColDiscount}>Discount</Text>
          <Text style={styles.packageColIncluded}>What's Included</Text>
        </View>
        {data.packages.rows.map((row, i) => (
          <View key={i} style={[styles.packageRow, i % 2 === 0 ? styles.rowEven : {}]}>
            <Text style={styles.packageColName}>{row.name}</Text>
            <Text style={styles.packageColSvc}>{row.svc}</Text>
            <Text style={styles.packageColDiscount}>{row.discount}</Text>
            <Text style={styles.packageColIncluded}>{row.included}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.subSectionTitle}>THE REGALIS ESSENTIAL — 15% Off</Text>
      <Text style={styles.description}>{data.packages.essential.description}</Text>
      <Text style={styles.description}>Includes: {data.packages.essential.includes}</Text>
      <PriceTable rows={data.packages.essential.rows} sqftRanges={data.sqftRanges} />

      <Text style={styles.subSectionTitle}>THE REGALIS SIGNATURE — Most Popular — 20% Off</Text>
      <Text style={styles.description}>{data.packages.signature.description}</Text>
      <Text style={styles.description}>Includes: {data.packages.signature.includes}</Text>
      <PriceTable rows={data.packages.signature.rows} sqftRanges={data.sqftRanges} />
    </Page>

    {/* Page 4: Crown & Summary */}
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.logoText}>REGALIS REALTY MEDIA</Text>
        <Text style={styles.subHeader}>Complete Service Menu — {data.market} — {data.year}</Text>
      </View>

      <Text style={styles.subSectionTitle}>THE REGALIS CROWN — 30% Off</Text>
      <Text style={styles.description}>{data.packages.crown.description}</Text>
      <Text style={styles.description}>Includes: {data.packages.crown.includes}</Text>
      <PriceTable rows={data.packages.crown.rows} sqftRanges={data.sqftRanges} />

      <Text style={styles.subSectionTitle}>All Packages at a Glance</Text>
      <PriceTable rows={data.packages.summary.rows} sqftRanges={data.sqftRanges} />

      <Text style={styles.subSectionTitle}>What's Included — Side by Side</Text>
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.compColService}>Service</Text>
          <Text style={styles.compColVal}>Essential</Text>
          <Text style={styles.compColVal}>Signature</Text>
          <Text style={styles.compColVal}>Crown</Text>
        </View>
        {data.packages.comparison.rows.map((row, i) => (
          <View key={i} style={[styles.comparisonRow, i % 2 === 0 ? styles.rowEven : {}]}>
            <Text style={styles.compColService}>{row.service}</Text>
            <Text style={styles.compColVal}>{row.essential}</Text>
            <Text style={styles.compColVal}>{row.signature}</Text>
            <Text style={styles.compColVal}>{row.crown}</Text>
          </View>
        ))}
      </View>

      <Text style={[styles.description, { color: '#0000aa', marginTop: 10, textAlign: 'center' }]}>
        Photos only = 10% off • Any photo + video = 15% off • Gold photo + video = 20% off • Crown = 30% off
      </Text>
      <Text style={[styles.description, { textAlign: 'center', marginTop: 5 }]}>
        (917) 683-8034 • contact@regalisrealtymedia.com • regalisrealtymedia.com
      </Text>
    </Page>
  </Document>
);
