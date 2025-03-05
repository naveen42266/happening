import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const IMG_BASE_URL = "https://res.cloudinary.com/dgvuytgom/image/upload/";

const artists = [
    {
        name: "A. R. Rahman",
        image: "https://garhwalpost.in/wp-content/uploads/2021/04/A.R.-Rahman.jpg",
    },
    {
        name: "Ananthu",
        image: "https://images.filmibeat.com/img/popcorn/profile_photos/ananthu-20211102205412-3597.jpg",
    },
    {
        name: "Krishh",
        image: "https://pbs.twimg.com/profile_images/1787652006456463360/rYE-MplS_400x400.jpg",
    },
    {
        name: "Mookuthi Murugan",
        image: "https://www.ticketprix.com/_next/image?url=https%3A%2F%2Fcdn.sporfy.com%2Fartist%2FFA2023041200800FAvy%2FsWSQa1pw-desktop_icon.jpg&w=3840&q=75",
    },
    {
        name: "Koushik",
        image: "https://i.scdn.co/image/ab6761610000e5eb3b81c917db05a7795b55063e",
    },
    {
        name: "Varsha",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp1KgtsItOl4QpqZhwlL1reJpI_anP5LMJ2Q&s",
    },
    {
        name: "Srinithi",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe-hMsFiOERQB44q2yHNkmEaQS1tPrlvTGZA&s",
    },
    {
        name: "Surmukhi",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTd-EbeuuxWa0fH2bePSvZBmfp1xc-YmHgPw&s",
    },
    {
        name: "Sabitha",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIvm5RdAu9szJFDxjokgmDcLHjbN2Eum_fGw&s",
    },
];


const CrewComponent = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Overview</Text>
            <Text style={styles.paragraph}>
                This musical night is dedicated to celebrating the versatility of two of the most legendary playback singers in Indian music whose iconic voices have defined an era of timeless melodies. Their soulful renditions continue to inspire musicians and captivate audiences.
            </Text>
            <Text style={styles.paragraph}>
                This concert will be led by the renowned playback singer and Kalaimamani Award winner:
            </Text>
            <Text style={styles.artist}>Artist</Text>

            <View>
                {artists.map((artist, index) => (
                    <View key={index} style={styles.artistContainer}>
                        <Image source={{ uri: artist.image }} style={styles.profileImage} />
                        <View>
                            <Text style={styles.artist}>{artist.name}</Text>
                            <TouchableOpacity style={styles.artistInfo}>
                                <Text>About Artist</Text>
                                <Ionicons name="chevron-forward" size={20} style={styles.chevronIcon} />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </View>


            {/* <Text style={styles.paragraph}>🎤 A. R. Rahman - He is an Oscar-winning Indian composer, singer, and music producer known for his soulful and innovative compositions.</Text> */}

            {/* <Text style={styles.paragraph}>🎤 Ananthu - A highly talented singer known for his powerful voice and deep connection with music.</Text>

            <Text style={styles.paragraph}>He will be joined by an incredible lineup of playback singers and Super Singer talents:</Text>

            <View style={styles.singerContainer}>
                <Text style={styles.singerDescription}>🎤 Mukesh - A dynamic singer with a rich voice.</Text>
            </View>

            <View style={styles.singerContainer}>
                <Text style={styles.singerDescription}>🎤 Mookuthi Murugan - A popular singer known for his folk and classical influence.</Text>
            </View>

            <View style={styles.singerContainer}>
                <Text style={styles.singerDescription}>🎤 Koushik - A versatile vocalist with an impressive range.</Text>
            </View>

            <View style={styles.singerContainer}>
                <Text style={styles.singerDescription}>🎤 Varsha - A soulful singer who has captivated audiences.</Text>
            </View>

            <View style={styles.singerContainer}>
                <Text style={styles.singerDescription}>🎤 Srinithi - A melodious voice with a unique singing style.</Text>
            </View>

            <View style={styles.singerContainer}>
                <Text style={styles.singerDescription}>🎤 Surmukhi - A talented singer known for her expressive performances.</Text>
            </View>

            <View style={styles.singerContainer}>
                <Text style={styles.singerDescription}>🎤 Sabitha - A rising star with a mesmerizing voice.</Text>
            </View> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        marginBottom: 15,
    },
    heading: {
        fontSize: 20,
        fontWeight: "bold",
        marginVertical: 5,
    },
    paragraph: {
        fontSize: 16,
        marginBottom: 10,
        lineHeight: 22,
    },
    boldText: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 10,
    },
    singerContainer: {
        marginBottom: 10,
    },
    singerDescription: {
        fontSize: 16,
        color: "#555",
    },
    profileImage: {
        width: 80, // Slightly reduced for better fit
        height: 80,
        borderRadius: 40, // Ensures it's perfectly circular
        borderWidth: 2, // Optional: Adds a subtle border
        borderColor: "#ddd", // Light border for a clean look
    },

    artist: {
        fontSize: 18, // Slightly larger for emphasis
        fontWeight: "bold", // Makes it stand out
        marginBottom: 4, // Reduced to improve spacing
        lineHeight: 24,
        color: "#333", // Darker color for readability
    },

    artistContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12, // Increased spacing
        paddingVertical: 8, // Adds padding for better layout
    },

    artistInfo: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5, // Space between text and icon
    },

    chevronIcon: {
        color: "#666", // Subtle color
    },

});

export default CrewComponent;
