
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import { timeline, projects, skillCategories, achievements } from '@/app/data';

// Register a standard font if we wanted, but standard types are fine.
// Using Helvetica by default.

const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontFamily: 'Helvetica',
        fontSize: 10,
        lineHeight: 1.5,
        color: '#333',
    },
    header: {
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 10,
        alignItems: 'center',
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginBottom: 4,
        color: '#000',
    },
    title: {
        fontSize: 14,
        color: '#555',
        marginBottom: 4,
    },
    contact: {
        fontSize: 9,
        flexDirection: 'row',
        gap: 10,
        color: '#666',
    },
    section: {
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        marginBottom: 8,
        paddingBottom: 2,
        color: '#000',
    },
    experienceItem: {
        marginBottom: 8,
    },
    expHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 2,
    },
    company: {
        fontWeight: 'bold',
        fontSize: 11,
    },
    role: {
        fontStyle: 'italic',
    },
    date: {
        color: '#666',
        fontSize: 9,
    },
    projectItem: {
        marginBottom: 6,
    },
    projectTitle: {
        fontWeight: 'bold',
        fontSize: 10,
    },
    skillCategory: {
        marginBottom: 4,
        flexDirection: 'row',
    },
    categoryName: {
        fontWeight: 'bold',
        width: 100,
    },
    skillList: {
        flex: 1,
        color: '#444',
    },
});

const ResumeDocument = () => (
    <Document>
        <Page size="A4" style={styles.page}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.name}>Sabiha Malik</Text>
                <Text style={styles.title}>Full-Stack Developer | Game Developer</Text>
                <View style={styles.contact}>
                    <Text>contact@sabiha.dev</Text>
                    <Text>|</Text>
                    <Text>github.com/sabiha-iqbal</Text>
                    <Text>|</Text>
                    <Text>linkedin.com/in/sabiha</Text>
                </View>
            </View>

            {/* Summary */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Professional Summary</Text>
                <Text>
                    Passionate Full-Stack Developer with a strong background in scalable web applications, interactive games, and AI-driven solutions. Experienced in building performant systems using modern technologies like Next.js, React, Node.js, and C++. Dedicated to writing clean, maintainable code and solving complex problems.
                </Text>
            </View>

            {/* Experience */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Experience</Text>
                {timeline.map((job, index) => (
                    <View key={index} style={styles.experienceItem}>
                        <View style={styles.expHeader}>
                            <Text style={styles.company}>{job.company}</Text>
                            <Text style={styles.date}>{job.year}</Text>
                        </View>
                        <Text style={styles.role}>{job.title}</Text>
                        <Text>{job.description}</Text>
                    </View>
                ))}
            </View>

            {/* Skills */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Technical Skills</Text>
                {skillCategories.map((cat, index) => (
                    <View key={index} style={styles.skillCategory}>
                        <Text style={styles.categoryName}>{cat.name}:</Text>
                        <Text style={styles.skillList}>{cat.skills.join(', ')}</Text>
                    </View>
                ))}
            </View>

            {/* Projects */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Key Projects</Text>
                {projects.slice(0, 4).map((project, index) => (
                    <View key={index} style={styles.projectItem}>
                        <Text style={styles.projectTitle}>{project.title} ({project.category})</Text>
                        <Text>{project.description}</Text>
                        <Text style={{ fontSize: 9, color: '#666', marginTop: 1 }}>Tech: {project.tech.join(', ')}</Text>
                    </View>
                ))}
            </View>

            {/* Achievements */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Achievements</Text>
                {achievements.map((ach, index) => (
                    <View key={index} style={{ marginBottom: 4 }}>
                        <Text style={{ fontWeight: 'bold' }}>{ach.title}</Text>
                        <Text>{ach.desc}</Text>
                    </View>
                ))}
            </View>

        </Page>
    </Document>
);

export default ResumeDocument;
