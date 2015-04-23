'use strict';
angular.module('DataDisplayPrototypeApp')
  .controller('FirebaseController', function ($scope, $firebaseObject) {

    var ref = new Firebase("https://data-display.firebaseio.com");

    var syncObject = $firebaseObject(ref);
    syncObject.$bindTo($scope, "data");

    // var accountsRef = ref.child("accounts");
    // var account_preferencesRef = ref.child("account_preferences");
    // var activitiesRef = ref.child("activities");
    // var answer_optionsRef = ref.child("answer_options");
    // var answersRef = ref.child("answers");
    // var assignmentsRef = ref.child("assignments");
    // var attachmentsRef = ref.child("attachments");
    // var attemptsRef = ref.child("attempts");
    // var auditsRef = ref.child("audits");
    // var chaptersRef = ref.child("chapters");
    // var chosen_optionsRef = ref.child("chosen_options");
    // var collaborationsRef = ref.child("collaborations");
    // var commentsRef = ref.child("comments");
    // var completionsRef = ref.child("completions");
    // var friendly_id_slugsRef = ref.child("friendly_id_slugs");
    // var header_imagesRef = ref.child("header_images");
    // var imagesRef = ref.child("images");
    // var invitationsRef = ref.child("invitations");
    // var learning_spacesRef = ref.child("learning_spaces");
    // var pathsRef = ref.child("paths");
    // var pointsRef = ref.child("points");
    // var questionsRef = ref.child("questions");
    // var quizzesRef = ref.child("quizzes");
    // var rich_contentsRef = ref.child("rich_contents");
    // var starsRef = ref.child("stars");
    // var statsRef = ref.child("stats");
    // var stepsRef = ref.child("steps");
    // var submissionsRef = ref.child("submissions");
    // var subscriptionsRef = ref.child("subscriptions");
    // var user_preferencesRef = ref.child("user_preferences");
    // var usersRef = ref.child("users");
    // var walksRef = ref.child("walks");

    $scope.createAccounts = function( id, owner_id ) {
      // Ref.set({
      //   accounts {
      //     id: id,
      //     owner_id
      //   }

      // });
    }

    $scope.createAccount_preferences = function( id, account_id ) {
      account_preferencesRef.set({
        id: id,
        account_id: account_id
      });
    }

    $scope.createActivities = function( id, user_id, trackable_id ) {
      activitieRef.set({
        id: id,
        user_id: user_id,
        trackable_id: trackable_id
      });
    }

    $scope.createAnswer_options = function( id, question_id ) {
      answer_optionsRef.set({
        id: id,
        question_id: question_id
      });
    }

    $scope.createAnswers = function( id, attempt_id, question_id ) {
      answersRef.set({
        id: id,
        question_id: question_id,
        attempt_id: attempt_id
      });
    }

    $scope.createAssignments = function( id ) {
      assignmentsRef.set({
        id: id
      });
    }

    $scope.createAttachments = function( id, user_id, attachable_file_id ) {
      attachmentsRef.set({
        id: id,
        user_id: user_id,
        attachable_file_id: attachable_file_id
      });
    }

    $scope.createAttempts = function( id, quiz_id, user_id) {
      attemptsRef.set({
        id: id,
        quiz_id: quiz_id,
        user_id: user_id
      });
    }

    $scope.createAudits = function( id, auditable_id, associated_id, user_id) {
      auditsRef.set({
        id: id,
        auditable_id: auditable_id,
        associated_id: associated_id,
        user_id: user_id
      });
    }

    $scope.createChapters = function( id, learning_space_id ) {
      chaptersRef.set({
        id: id,
        learning_space_id: learning_space_id
      });
    }

    $scope.createChosen_options = function( id, answer_id, answer_options_id ) {
      chosen_optionsRef.set({
        id: id,
        answer_id: answer_id,
        answer_options_id: answer_options_id
      });
    }

    $scope.createCollaborations = function( id, user_id, learning_space_id ) {
      collaborationsRef.set({
        id: id,
        user_id: user_id,
        learning_space_id: learning_space_id
      });
    }

    $scope.createComments = function( id, user_id, chapter_id ) {
      commentsRef.set({
        id: id,
        user_id: user_id,
        chapter_id: chapter_id
      });
    }

    $scope.createCompletions = function( id, chapter_id, user_id ) {
      completionsRef.set({
        id: id,
        chapter_id: chapter_id,
        user_id: user_id
      });
    }

    $scope.createFriendly_id_slugs = function( id, sluggable_id ) {
      friendly_id_slugsRef.set({
        id: id,
        sluggable_id: sluggable_id
      });
    }

    $scope.createHeader_images = function( id, user_id, learning_space_id ) {
      header_imagesRef.set({
        id: id,
        user_id: user_id,
        learning_space_id: learning_space_id
      });
    }

    $scope.createImages = function( id, user_id ) {
      imagesRef.set({
        id: id,
        user_id: user_id
      });
    }

    $scope.createInvitations = function( id, learning_space_id, sender_id ) {
      invitationsRef.set({
        id: id,
        learning_space_id: learning_space_id,
        sender_id: sender_id
      });
    }

    $scope.createLearning_spaces = function( id, user_id, chapters_count, subscriptions_count, stars_count ) {
      learning_spacesRef.set({
        id: id,
        user_id: user_id,
        chapters_count: chapters_count,
        subscriptions_count: subscriptions_count,
        stars_count: stars_count
      });
    }

    $scope.createPaths = function( id, user_id ) {
      pathsRef.set({
        id: id,
        user_id: user_id
      });
    }

    $scope.createPoints = function( id, user_id, entity ) {
      pointsRef.set({
        id: id,
        user_id: user_id,
        entity: entity
      });
    }

    $scope.createQuestions = function( id, quiz_id ) {
      questionsRef.set({
        id: id,
        quiz_id: quiz_id
      });
    }

    $scope.createQuizzes = function( id ) {
      quizzesRef.set({
        id: id
      });
    }

    $scope.createRich_contents = function( id ) {
      rich_contentsRef.set({
        id: id
      });
    }

    $scope.createStars = function( id, learning_space_id ) {
      starsRef.set({
        id: id,
        learning_space_id: learning_space_id
      });
    }

    $scope.createStats = function( id ) {
      statsRef.set({
        id: id
      });
    }

    $scope.createSteps = function( id, path_id, learning_space_id ) {
      stepsRef.set({
        id: id,
        path_id: path_id,
        learning_space_id:learning_space_id
      });
    }

    $scope.createSubmissions = function( id,assignment_id, user_id ) {
      submissionsRef.set({
        id: id,
        assignment_id: assignment_id,
        user_id: user_id
      });
    }

    $scope.createSubscriptions = function( id, user_id, learning_space_id ) {
      subscriptionsRef.set({
        id: id,
        user_id: user_id,
        learning_space_id: learning_space_id
      });
    }

    $scope.createUser = function( id, user_id ) {
      usersRef.set({
        id: id,
        user_id: user_id
      });
    }

    $scope.createUser = function() {
      ref.push({
          users: [{
            id: 1,
            sign_in_count: 4,
            current_sign_in_at: "20:11",
            last_sign_in_at: "20:30",
            name: "Peter de Vries"
          },
          {
            id: 2,
            sign_in_count: 1,
            current_sign_in_at: "18:23",
            last_sign_in_at: "19:34",
            name: "Maarten de Boer"
          },
          {
            id: 3,
            sign_in_count: 5,
            current_sign_in_at: "16:40",
            last_sign_in_at: "16:40",
            name: "Sietske van Woerde"
          },
          {
            id: 4,
            sign_in_count: 12,
            current_sign_in_at: "02:50",
            last_sign_in_at: "14:23",
            name: "Samson derpema"
          },
          {
            id: 5,
            sign_in_count: 21,
            current_sign_in_at: "13:55",
            last_sign_in_at: "22:34",
            name: "Maaike Peer"
          }]
      });
    }

    $scope.createWalks = function( id, user_id, path_id) {
      ref.push({
        walks: [{
          id: 1,
          user_id: 1,
          path_id: 1
        },
        {
          id: 2,
          user_id: 1,
          path_id: 2
        }]
      });
    }

    $scope.deleteData = function() {
      ref.set({});
    }

    $scope.createData = function() {
      $scope.createUser();
      // $scope.createAccounts();
      // $scope.createAccount_preferences();
      // $scope.createActivities();
      // $scope.createAnswer_options();
      // $scope.createAnswers();
      // $scope.createAssignments();
      // $scope.createAttachments();
      // $scope.createAttempts();
      // $scope.createAudits();
      // $scope.createChapters();
      // $scope.createChosen_options();
      // $scope.createCollaborations();
      // $scope.createComments();
      // $scope.createCompletions();
      // $scope.createFriendly_id_slugs();
      // $scope.createHeader_images();
      // $scope.createImages();
      // $scope.createInvitations();
      // $scope.createLearning_spaces();
      // $scope.createPaths();
      // $scope.createPoints();
      // $scope.createQuestions();
      // $scope.createQuizzes ();
      // $scope.createRich_contentsR();
      // $scope.createStars();
      // $scope.createStats();
      // $scope.createSteps();
      // $scope.createSubmissions();
      // $scope.createSubscriptions();
      $scope.createWalks();
    }
  });
