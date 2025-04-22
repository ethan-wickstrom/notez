/**
 * Represents a single note within the application.
 */
export type Note = {
  /**
   * Unique identifier for the note (e.g., UUID).
   */
  id: string;

  /**
   * The title of the note.
   */
  title: string;

  /**
   * The main content of the note in Markdown format.
   */
  content: string;

  /**
   * ISO 8601 timestamp indicating when the note was created.
   */
  createdAt: string;

  /**
   * ISO 8601 timestamp indicating when the note was last updated.
   */
  updatedAt: string;
};

/**
 * Represents the data required to create a new note, excluding generated fields like id and timestamps.
 */
export type NewNoteData = Omit<Note, 'id' | 'createdAt' | 'updatedAt'>;

/**
 * Represents the data required to update an existing note. All fields are optional.
 */
export type UpdateNoteData = Partial<Omit<Note, 'id' | 'createdAt'>>;